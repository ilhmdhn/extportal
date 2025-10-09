const { QueryTypes } = require('sequelize');
const db = require('../lib/db');
const response = require('../lib/response');

const getVersion = async (req, res) => {
    try {
        const { type } = req.params;
        const [data] = await db.query(
            'SELECT * FROM apps_update WHERE os = ?',
            { replacements: [type], type: QueryTypes.SELECT }
        );

        if (!data) {
            return response.error(res, 'Data not found', 404);
        }

        data.os = data.os;
        data.pop_up = parseInt(data.pop_up);
        data.force_update = parseInt(data.force_update);

        return response.success(res, 'success', data);
    } catch (error) {
        return response.error(res, error.message, 500);
    }
};

module.exports = { getVersion };
