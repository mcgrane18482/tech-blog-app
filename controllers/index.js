const router= require('express').Router();
const api = require('./api');
const viewRoutes =  require('./viewRoutes');

router.use('/api', api);
router.use('/', viewRoutes);



module.exports = router;