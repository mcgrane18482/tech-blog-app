const router= require('express').Router();
const api = require('./api');
const viewRoutes =  require('./viewRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/api', api);
router.use('/', [viewRoutes, userRoutes]);


module.exports = router;