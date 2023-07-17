const router = require('express').Router();
const User = require('../models/User');

// Login User
router.post('/login', async (req, res) => {
    try {
        const formUser = req.body.userName;
        const formPassword = req.body.password;

        const user = await User.findOne({
            where: {
                userName: formUser
            }
        });

        // if the user doesnt exist, redirect them to register
        if(!user) return res.redirect('/register');

        // Validate that the password is a match
        const isValidPass = await user.validatePass(formPassword);

        if (!isValidPass) throw new Error('invalid_password');

        // start a new session with that user.id stored 
        req.session.user_id = user.id;

       res.json(user);

    } catch (err) {
        if (err.message === 'invalid_password') {
            res.redirect('/login'); 
        }
    }
});

module.exports = router;