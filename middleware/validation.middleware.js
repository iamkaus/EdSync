import { body, validationResult } from 'express-validator';

/**
 * Middleware to validate school data
 * Uses express-validator for validation rules and processing
 */

export const requestBodyValidator = [
    // Name validation
    body('name')
        .exists().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim()
        .notEmpty().withMessage('Name cannot be empty'),

    // Address validation
    body('address')
        .exists().withMessage('Address is required')
        .isString().withMessage('Address must be a string')
        .trim()
        .notEmpty().withMessage('Address cannot be empty'),

    // Latitude validation
    body('latitude')
        .exists().withMessage('Latitude is required')
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a float between -90 and 90'),

    // Longitude validation
    body('longitude')
        .exists().withMessage('Longitude is required')
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a float between -180 and 180'),

    // Error handling middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];

/**
 * Reusable validation factory for creating custom validators
 * @param {Array} validationRules - Array of express-validator rules
 * @returns {Array} - Array of middleware functions
 */

export const createValidator = (validationRules) => {
    return [
        ...validationRules,
        // Error handling middleware
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }
            next();
        }
    ];
};