const router = require('express').Router();


// Add a blog post
router.post('/blogPost', isAuthenticated, async (req, res) => {
    await Post.create({
        title: req.body.title,
        text: req.body.text,
        userID: req.session.user_id
    });

});

module.exports = router;