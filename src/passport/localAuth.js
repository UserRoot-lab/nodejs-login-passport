const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//Esto es el esquema 
const User = require('../models/user');

//Serializando datos , pillamos el ID para que se autentique en cada pagina
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Deserializando datos , aqui cada vez que abramos una pagina hace la consulta a la DB con el ID que recibimos arriba 
passport.deserializeUser(async (id, done) => {
    var user = await User.findById(id);
    done(null, user);
});



//Aqui se autentica el usuario y devuelve sus datos . El done termina el proceso(acuerdate el done es un parametro del callback).
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {


        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
 



}));



passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //No se para que sirve 
}, async (req, email, password, done) => {
    var user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'No user found.'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect password.'))
    }
    done(null, user); //No hace falta repetir el proceso porque no vamos a mostrar msg
}));


