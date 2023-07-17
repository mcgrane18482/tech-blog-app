const router = require('express').Router();
const auth = require('../utils/auth')


// Show Homepage
router.get('/', (req, res) => {
    res.render('homepage', {
        isHome: true
    });
});

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