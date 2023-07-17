const router = require('express').Router();
const User = require('../models');

// Login User
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {userName: req.body.userName}});
     
        if(!userData){
            res.status(400).json({message: 'Password or email incorrect'})
        }
        // Validate that the password is correct
        const isValidPass = await user.validatePass(req.body.password);

        if (!isValidPass) {
            res.status(400).json({message: 'Incorrect password'});
            return;
        }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json({message: 'Logged in successfully'});
      });

    } catch (err) {
      res.status(400).json(err);
    }
});

// Register User
router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
      
            res.status(200).json(newUser);
            console.log(newUser);
          });

    } catch (err) {
        const dupeName = err.errors.find(e => e.path === 'userName');
        // if username already exists
        if (dupeName) res.json({error: 'Username already exists'})
    }
});

module.exports = router;