const router = require('express').Router();
const controller = require('../controllers/dashboardController');
router.get('/', controller.showDashboard);
module.exports = router;
