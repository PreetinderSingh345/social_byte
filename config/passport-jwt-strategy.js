const passport=require("passport");//requiring passport and its existing instance will be used
const JwtStrategy=require("passport-jwt").Strategy;//requiring the passport-jwt strategy
const ExtractJwt=require("passport-jwt").ExtractJwt;//requiring extract jwt which will help us extract the jwt token from the header
const User=require("../models/user");//requiring the user model for which the user schema has been defined, for which the authentication will be done

//defining the options

let options={

    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// defining the jwt from request by extracting the jwt from the list of tokens inside header, inside authorization section

    secretOrKey: "this_is_jwt_secret"//defining the key i.e. used for encrypting and decrypting the jwt

    //issuer and audience needn't be defined as we don't have a domain other than local host as of now

}

//telling passport to use the jwt strategy, we provide to it the options set above, a callback function containing the jwtPayload(contains the data) and a callback function named done as the arguments(this passport middleware is used to check if the user is present or not in the database)

passport.use(new JwtStrategy(options, function(jwtPayload, done){

    // finding the user using the data contained in the jwt payload and we have a callback function to handle the situation

    User.findById(jwtPayload._id, function(err, user){

        // if there is an error while finding the user, we print an error message and return 

        if(err){

            console.log("Error : "+err);
            return ;

        }

        // if the user has been found, then we return by telling passport that there is no error and providing it the user through done(false in case the user hasn't been found)

        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }

    });

}));

//exporting passport, for making the jwt strategy available wherever needed

module.exports=passport;