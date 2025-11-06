const fs = require('fs').promises;
const path = require('path');
const response = require('../lib/response');
const dbMembership = require('../lib/db_membership');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const AttendanceGPS  = require('../model/attendance_gps');

const outletList = async (req, res) => {
    try {
        const outletList = await dbMembership.query(
            `SELECT Code as code,Name as name,Brand as brand, OutletLat as latitude, OutletLong as longitude FROM MasterOutlet ORDER BY Code ASC`,
            { type: sequelize.QueryTypes.SELECT }
        );
        return response.success(res, 'success', outletList);
    } catch (error) {
        console.error('Error get outlet list:', error);
        return response.error(res, error.message, 500);
    }
};

module.exports = {
    outletList
};
