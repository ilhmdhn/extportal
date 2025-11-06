
const fs = require('fs');
const path = require('path');
const response = require('../lib/response');
const Employee = require('../model/employee');
const navState = require('../lib/navState');
const UserAccessApps = require('../model/access');
const UserType = require('../model/user_type');

const accessControl = async (req, res) => {
    try {
        const { nip, outlet } = req.user;
        const navAccess = await navState();
        const EmployeeData = await Employee.findOne({
            where: { NIP: nip},
            attributes: ['Level']
        });

        if (!EmployeeData) {
            return response.unauthorized(res, 'User tidak ditemukan');
        }

        const userType = await UserType.findOne({
            where: { UserType: EmployeeData.Level },
            attributes: ['ID']
        });

        if (!userType) {
            return response.unauthorized(res, 'Tipe user tidak ditemukan');
        }

        const accessRecords = await UserAccessApps.findAll({
            where: { id: userType.ID },
            attributes: ['menu', 'access', 'approver', 'list_all']
        });

        const requireNav = ['cuti', 'jko'];
        const new_data = accessRecords.map(row => {
            let access = 0;
            if (row.access === 1) {
                    access = 1;
                if (row.approver === 1) {
                    access = 3;
                } else if (row.list_all === 1) {
                    access = 2;
                }
                if (!navAccess && requireNav.includes(row.menu)) {
                    access = 0;
                }
            }
            return {
                menu: row.menu,
                access
            };
        });
        response.success(res, 'Akses kontrol berhasil', new_data);
    } catch (error) {
        console.error('Error during access control:', error);
        response.error(res, 'Akses kontrol gagal', 401);
    }
}

module.exports = {
    accessControl
};