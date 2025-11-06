const fs = require('fs').promises;
const path = require('path');
const response = require('../lib/response');
const dbMembership = require('../lib/db_membership');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const AttendanceGPS  = require('../model/attendance_gps');


const attendanceDir = path.join(__dirname,'..','..','uploads','attendance');

const postGpsAttendance = async (req, res) => {
    const { outlet, distance, type, lat, long, accuracy, is_face_recognition } = req.body;
    const file = req.file;
    const photoPath = file?.path;
    const user = req.user;
    try {
        if (!outlet || !distance || !type || !photoPath) {
            response.error(res, 'Missing required fields', 400);
            if (photoPath) {
                try {
                    await fs.unlink(photoPath);
                } catch (err) {
                    console.error('Gagal menghapus file duplikat:', err);
                }
            }
            return;
        }

        // Ambil lokasi outlet
        const [outletData] = await dbMembership.query(
            `SELECT OutletLat, OutletLong, TimeZoneName FROM MasterOutlet WHERE Code = ?`,
            { replacements: [outlet], type: sequelize.QueryTypes.SELECT }
        );

        // Fungsi hitung jarak (Haversine)
        /*function haversineDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // km
            const dLat = ((lat2 - lat1) * Math.PI) / 180;
            const dLon = ((lon2 - lon1) * Math.PI) / 180;
            const a =
                Math.sin(dLat / 2) ** 2 +
                Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c * 1000; // meters
        }

        // Validasi jarak
        const distanceFromBoundary = Math.floor(
            haversineDistance(lat, long, outletData.OutletLat, outletData.OutletLong)
        );
        */
        if (distance > 50) {
            response.error(res, 'Anda terlalu jauh dari outlet, absen GPS gagal dilakukan...', 400);
            if (photoPath) {
                try {
                    await fs.unlink(photoPath);
                } catch (err) {
                    console.error('Gagal menghapus file duplikat:', err);
                }
            }
            return;
        }

        const time = new Date();
        if (outletData.TimeZoneName === 'WIT') {
            time.setUTCHours(time.getUTCHours() + 9);
        } else if (outletData.TimeZoneName === 'WITA') {
            time.setUTCHours(time.getUTCHours() + 8);
        } else {
            time.setUTCHours(time.getUTCHours() + 7);
        }

       const threeMinutesAgo = new Date(time.getTime() - 3 * 60 * 1000);
        const isAttendanceExist = await AttendanceGPS.findOne({
            where: {
                nip: user.nip,
                type,
                attendance_time: {
                    [Op.between]: [threeMinutesAgo, time]
                }
            }
        });

        if (isAttendanceExist) {
            response.success(res, 'Already checked in within the last 3 minutes');
            if (photoPath) {
                try {
                    await fs.unlink(photoPath);
                } catch (err) {
                    console.error('Gagal menghapus file duplikat:', err);
                }
            }
            return;
        }
        const fileName = `${user.nip}_${time.getTime()}.jpg`;
        const newFilePath = path.join(attendanceDir, fileName);
        await AttendanceGPS.create({
            outlet,
            nip: user.nip,
            pict: `${process.env.BASE_URL}/storage/attendance/${fileName}`,
            attendance_time: time,
            outlet_ori: user.outlet,
            name: user.name,
            type,
            distance: Math.round(distance),
            lat,
            long,
            accuracy,
            is_face_recog: is_face_recognition ? '1' : '0'
        });

        response.success(res, 'Attendance recorded successfully');

        (async () => {
            try {
                await fs.mkdir(attendanceDir, { recursive: true });

                // Langsung pindahkan dari lokasi upload (multer) ke folder Attendance
                await fs.rename(photoPath, newFilePath);

            } catch (error) {
                console.error('File operation error:', error);
                if (photoPath) {
                    try {
                        await fs.unlink(photoPath);
                    } catch (err) {
                        console.error('Gagal menghapus file duplikat:', err);
                    }
                }
                return;
            }
        })();

    } catch (error) {
        console.error('Error in postGpsAttendance:', error);
        response.error(res, error.message, 500);
        if (photoPath) {
            try {
                await fs.unlink(photoPath);
            } catch (err) {
                console.error('Gagal menghapus file duplikat:', err);
            }
        }
        return;
    }
};

module.exports = {
    postGpsAttendance
};
