const router= require('express').Router();
const api = require('./api');
const viewRoutes =  require('./viewRoutes');
const userRoutes = require('./userRoutes');

router.use('/api', api);
router.use('/', viewRoutes);
router.use('/', userRoutes);


module.exports = router;