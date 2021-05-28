import  PassportJWT  from 'passport-jwt'
import  passport  from 'passport'
import  UsersModel  from '../models/users.model'
import { devConfig } from '../config/config.js' 

import redis from 'redis';
let client = redis.createClient() // Create a new redis instance

export const configureJWTStartegy = () => {

    var opts = {}
    opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = devConfig.secret;

    passport.use(
        new PassportJWT.Strategy(opts, function(payload, done) {
            // console.log(payload);


            // FOR THE MONGOOSE
            // UsersModel.findOne({_id: payload.id}, function(err, user) {
            //     if (err) {
            //         return done(err, false);
            //     }
            //     if (user) { 
            //         return done(null, user);
            //     } else {
            //         return done(null, false);
            //         // or you could create a new account
            //     }
            // });

            // FOR THE REDIS
            client.hgetall(payload.id, async (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) { 
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
              })
        })
    );
};
