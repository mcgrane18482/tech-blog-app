const router = require('express').Router();
const User = require('../models/User');

// Login User
router.post('/login', async (req, res) => {
    try {
        const formUser = req.body.userName;
        const formPassword = req.body.password;

        const user = await User.findOne({where: {userName: formUser}});
     
        if(!user){
            res.status(400).json({message: 'An account with that username does not exist'})
        }
        // Validate that the password is correct
        const isValidPass = await user.validatePass(formPassword);

        if (!isValidPass) {
            res.status(400).json({message: 'Incorrect password'});
            return;
        }

        req.session.user_id = user.id;
        res.render('dashboard');
       
    } catch (err) {
        console.log(err)
      res.json({error: err});
    }
});

// Register User
router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
      
            console.log(newUser);
            res.render('dashboard');
          });

    } catch (err) {
        const dupeName = err.errors.find(e => e.path === 'userName');
        // if username already exists
        if (dupeName) res.json({error: 'Username already exists'})
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('dashboard');
})


module.exports = router;