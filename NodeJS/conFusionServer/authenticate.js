var passport = require('passport');
var LocalStrategy = require ('passport-local').Strategy;
var User = require ('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');



exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};//the options that I'm going to specify for my JWT based strategy.

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //option specifies how the jsonwebtoken should be extracted from the incoming request message.
opts.secretOrKey = config.secretKey;// parameter which helps me to supply the secret key which I'm going to be using within my strategy for the sign-in.

exports.jwtPassport = passport.use(new JwtStrategy(opts, //JWT strategy takes the options as the first parameter. The strategy options and the second one is the verify function that I need to supply, and so the verify function I'm going to supply it in the next line here
    (jwt_payload, done) => {// done is the callback, provided by passport. Whenever you have passport which you're configuring with a new strategy, you need to supply the second parameter done. Through this done parameter, you will be passing back information to passport which it will then use for loading things onto the request message. 
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {//in the jwt.payload, there is a ID field that comes in. So, that is what I am going to be assigning as the ID field here.
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});


