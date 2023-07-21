const router = require('express').Router();
const auth = require('../utils/auth');
const User = require('../models/User');


// Show Homepage
router.get('/', (req, res) => {
    res.render('homepage', {
        isHome: true,
        isLoggedIn: req.session.logged_in 
    });
});

// Show Login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Show Register page
router.get('/register', (req, res) => {
    res.render('register');
});

// Show dashboard 
router.get('/dashboard', auth, async (req, res) => {
    // const user = await User.findByPk(req.session.user_id);
    res.render('dashboard', {
        isLoggedIn: req.session.logged_in 
      });
});

module.exports = router;