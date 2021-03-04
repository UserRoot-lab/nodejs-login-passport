const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');



//Inits

const app = express();
require('./database')
require('./passport/localAuth')

//Settings
app.set('port', process.env.PORT || 3000);
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname , "views"));

//Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});


//Middlewares 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Flash msg
app.use((req,res,next) =>{
   app.locals.signupMessage = req.flash('signupMessage');
   app.locals.signinMessage = req.flash('signinMessage');
   next();
});

//Routes
app.use('/', require('./routes/index'));




