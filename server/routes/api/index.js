const router = require('express').Router();
const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes');
const expertRoutes = require('./expertRoutes');

router.use('/users', userRoutes);
router.use('/friends', friendRoutes);
router.use('/experts', expertRoutes);

module.exports = router;
