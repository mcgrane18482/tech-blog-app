const router = require('express').Router();
const auth = require('../utils/auth')



// Show Login page
router.get('/login', (req, res) => {
    res.render('login', {
      isLogin: true
    });
});

// Show Register page
router.get('/register', (req, res) => {
    res.render('register', {
        isRegister: true
    });
});

module.exports = router;