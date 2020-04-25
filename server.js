// CONFIG
const express = require('express');
const { connection } = require('mongoose');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

const connectDB = require('./config/db');

const app = express();
let PORT = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// CONNECTION
connectDB();


// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 600000 },
    store: new MongoStore({
      mongooseConnection: connection,
      ttl: 24 * 60 * 60 * 1000
    })
}));


// ROUTES
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/post.routes'));


app.all('*', (req, res, next) => {
    res.render('error');
});


// LISTEN
app.listen(PORT, () => console.log(`El servidor está listo en el puerto ${PORT}`))


