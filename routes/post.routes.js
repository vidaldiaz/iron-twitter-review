const router = require('express').Router();

const Post = require('../models/post.model');
const User = require('../models/user.model');

const { protect } = require('../middlewares/protected');


router.get('/crear-post', protect, (req, res) => {
    res.render('crear-post');
});




router.get('/feed', protect, async (req, res) => {

    let posts = await Post.find({}).populate('user', 'name email');
    res.render('feed', {posts});

});

router.get('/search', async (req, res) => {

    let posts = await Post.find(req.query);
    res.render('feed', {posts});

});


router.post('/crear-post', protect, async (req, res) => {
    
    let { text } = req.body;

    await Post.create({ text, user: req.session.currentUser });
    
    res.redirect('/feed');

});


router.get('/editar-post/:postId', async (req, res) => {

    let post = await Post.findById(req.params.postId);
    res.render('editar-post', {post});

});


router.post('/editar-post/:postId', async (req, res) => {

    await Post.findByIdAndUpdate(req.params.postId, {...req.body})
    res.redirect('/feed')

});


router.post('/eliminar-post/:postId', async (req, res) => {

    await Post.findByIdAndDelete(req.params.postId)
    res.redirect('/feed')

});




module.exports = router;