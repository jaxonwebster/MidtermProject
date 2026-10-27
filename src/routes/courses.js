const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/courseController');
router.get('/', controller.listCourses);
router.post('/', [body('name').trim().notEmpty().withMessage('Enter a course name.')], controller.createCourse);
router.post('/:id/delete', controller.deleteCourse);
module.exports = router;
