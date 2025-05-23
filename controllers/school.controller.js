import { databaseConnection } from '../config/mysql.config.js'
import { getDistance } from "../helper/calculate-distance.helper.js";

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
 * @function listSchools
 * @description Handles GET requests to list schools sorted by their distance from a given latitude and longitude.
 * Parses query parameters for `latitude` and `longitude`, validates them, fetches schools from the database,
 * calculates the distance from each school to the given coordinates, sorts them by distance, and returns the result.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.query - The query parameters
 * @param {string} req.query.latitude - The latitude coordinate as a string
 * @param {string} req.query.longitude - The longitude coordinate as a string
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {JSON} A JSON response containing the sorted list of schools with their distances from the given point,
 * or an appropriate error message and status code if validation or internal errors occur.
 *
 * @throws {400} If latitude or longitude are missing or invalid.
 * @throws {500} If a database error occurs.
 */

/**
 * @route GET /api/v1/school/listSchools
 * @desc allows user to list schools based on provided longitude and latitude
 * @public
 */

export const listSchools = async (req, res, next) => {
    try {
        const latitude = parseFloat(req.query.latitude);
        const longitude = parseFloat(req.query.longitude);

        if (!latitude || !longitude) {
            return res.status(400).json({
                message: 'Latitude and longitude are required.'
            })
        }

        if (isNaN(latitude) || isNaN(longitude)) {
            return res.send(400).json({
                message: 'Latitude and Longitude must be valid numbers.'
            })
        }

        try {
            const [ schools ] = await databaseConnection.execute(
                'SELECT * FROM school'
            );

            const sortedSchools = schools.map(school => ({
                ...school,
                distance: getDistance(latitude, longitude, school.latitude, school.longitude)
            })).sort((a, b) => a.distance - b.distance);

            res.json(sortedSchools);
        } catch (error) {
            res.status(500).json({
                message: `Internal server error: ${error.message}`
            });
        }
    } catch ( error ) {
        next( error );
    }
}