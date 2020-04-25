const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const Post = require('../models/post.model');

const { protect } = require('../middlewares/protected');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});


router.post('/signup', async (req, res) => {

    let { name, email, password } = req.body;

    let salt     = await bcrypt.genSalt(10);
    let hashPass = await bcrypt.hash(password, salt);

    await User.create({ name, email, password: hashPass });

    res.redirect('/login');

});


router.post('/login', async (req, res) => {

    let { email, password } = req.body;

    if( email === '' || password === '') {
        res.render('login', { msg: 'Por favor llene todos los campos'})
    }

    let user = await User.findOne({email});

    if(!user) return res.render('login', { msg: 'El usuario no existe'});

    let isMatch = await bcrypt.compare(password, user.password);

    if(isMatch) {
        req.session.currentUser = user;
        res.redirect("/feed");
    } else {
        return res.render('login', { msg: 'No coinciden los campos'});
    }

});

router.get('/logout', async (req, res) => {

    try {

        await req.session.destroy();
        res.redirect("/login");

    } catch (err) {
        res.render('error');
    }

});


router.get('/profile/:id', protect,  async (req, res) => {

    let { id } = req.params;

    let user = await User.findById(id, 'name email -_id');


    res.render('profile', { user });
});




module.exports = router;