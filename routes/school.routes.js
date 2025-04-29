import { Router } from 'express'
import { addSchool, listSchools } from "../controllers/school.controller.js";
import {requestBodyValidator} from "../middleware/validation.middleware.js";

// router instance
const schoolRoutes = Router()

/**
 * @route POST /api/v1/school/addSchool
 * @desc allows user to add school to database
 * @public
 */

schoolRoutes.post('/addSchool', requestBodyValidator, addSchool)

/**
 * @route GET /api/v1/school/listSchools
 * @desc allows users to list all the schools based on provided longitude and latitude
 * @public
 */

schoolRoutes.get('/listSchools', listSchools)

export default schoolRoutes;