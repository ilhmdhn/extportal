const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const response = require('../lib/response');
const Employee = require('../model/employee');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const login = async(req, res) => {
    try {
        const { username, password} = req.body; 
        const hash = crypto.createHash('md5').update(password).digest('hex');
        const privateKey = fs.readFileSync('private.key', 'utf8');
        const user = await Employee.findOne({
            where: {
                [Op.or]: [
                    { NIP: username },
                    { EMail: username }
                ],
                Pass: hash
            }
        });
        if (!user) {
            return response.unauthorized(res, 'Invalid username or password');
        }
        const name = [user.FirstName, user.MiddleName, user.LastName].filter(Boolean).join(' ').trim() || user.NIP;
        const payload = {
            nip: user.NIP,
            // name: [user.FirstName, user.MiddleName, user.LastName].filter(Boolean).join(' '),
            name: name,
            email: user.EMail,
            role: user.Level,
            jabatan: user.Jabatan??'none',
            pangkat: user.Pangkat??'non pangkat',
            phone: user.Phone??'none',
            sex: user.Sex??'none',
            departemen: user.Departemen??'none',
            emp_date: user.employmentDate??'none',
            picture: `https://eportal.happypuppy.id/${user.Picture}`,
            signature: `https://eportal.happypuppy.id/${user.Signature}`,
            outlet: user.Outlet,
            akses_outlet: user.OutletAkses,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 4 * 60 * 60 // 4 jam
        };
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
        
        // Tambahkan Bearer prefix
        response.success(res, 'Login successful', `Bearer ${token}` );
    } catch (error) {
        response.error(res, 'Login failed', 401);
    }
}

module.exports = {
    login
};