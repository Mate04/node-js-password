const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//inizialitations
const app = express();
require('./database');
require('./passport/local-auth');
//setting
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'mysecretssessions',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());

app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
})


//routes
app.use('/', require('./routes/index'));


//starting server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});