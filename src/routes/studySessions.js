const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/studySessionController');
router.get('/', controller.listSessions);
router.post('/', [body('date').isISO8601().withMessage('Enter a valid date.'), body('minutes').isInt({ min: 1, max: 1440 }).withMessage('Enter a duration from 1 to 1440 minutes.')], controller.createSession);
router.post('/:id/delete', controller.deleteSession);
module.exports = router;
