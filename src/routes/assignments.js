const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/assignmentController');
const assignmentRules = [
  body('title').trim().notEmpty().withMessage('Enter an assignment title.'),
  body('courseId').isInt({ min: 1 }).withMessage('Choose a course.'),
  body('dueDate').optional({ values: 'falsy' }).isISO8601().withMessage('Enter a valid due date.'),
  body('status').isIn(['Not started', 'In progress', 'Completed']).withMessage('Choose a valid status.')
];
router.get('/', controller.listAssignments);
router.get('/new', controller.newAssignmentForm);
router.post('/', assignmentRules, controller.createAssignment);
router.get('/:id/edit', controller.editAssignmentForm);
router.post('/:id', assignmentRules, controller.updateAssignment);
router.post('/:id/toggle', controller.toggleComplete);
router.post('/:id/delete', controller.deleteAssignment);
router.get('/:id', controller.showAssignment);
module.exports = router;
