import { databaseConnection } from '../config/mysql.config.js'

/**
 * Adds a new school to the database
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing school data
 * @param {string} req.body.name - School name
 * @param {string} req.body.address - School address
 * @param {string|number} req.body.latitude - School latitude coordinate
 * @param {string|number} req.body.longitude - School longitude coordinate
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} JSON response with status and school data
 */

/**
 * @route POST /api/v1/school/addSchool
 * @desc allows user to add school to database
 * @public
 */

export const addSchool = async (req, res, next) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({message: 'All fields are required'});
        }

        let schoolLatitude = parseFloat(latitude);
        let schoolLongitude = parseFloat(longitude);

        if (isNaN(schoolLatitude) || isNaN(schoolLongitude)) {
            return res.send(400).json({
                message: 'Latitude and Longitude must be valid numbers.'
            })
        }

        try {
            const [ result ] = await databaseConnection.execute(
                'INSERT INTO school (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
                [name, address, schoolLatitude, schoolLongitude]
            );

            res.status(201).json({
                message: 'School added successfully',
                school: {
                    id: result.insertId,
                    name,
                    address,
                    latitude: latitude,
                    longitude: longitude
                }
            })
        } catch ( error ) {
            res.status(500).json({
                message: `Internal server error: ${error.message}`
            });
        }

    } catch ( error ) {
        next( error );
    }
}

/**
 * @route GET /api/v1/school/listSchools
 * @desc allows user to list schools based on provided longitude and latitude
 * @public
 */

export const listSchools = async (req, res, next) => {

}