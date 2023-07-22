const router = require('express').Router();
const {Post} =  require('../../models')


// Add a blog post
router.post('/',  async (req, res) => {
    try {

        const newPost = await Post.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id
        });

        res.json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id',  async (req, res) => {
    try {

      
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;