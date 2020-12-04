const passport=require("passport");//requiring passport 
const LocalStrategy=require("passport-local").Strategy;//requiring the passport-local strategry
const User=require("../models/user");//requiring the User model for which the userSchema is defined

// authentication using passport

passport.use(new LocalStrategy({//telling passport to use the local strategy we've required above

    usernameField: "email",//defining the usernameField as "email"(unique for each and every user)

}, 

    function(email, password, done){//defining the callback function inside the local strategy which takes the email, passsword and done(function used for reporting to passport and can have any other name too) as the parameters

        User.findOne({email: email}, function(err, user){//finding a user with the above email(as in the parameter) and we have a callback function to handle the situation

            if(err){//if there is an error while finding a user with the above email(as in the parameter)

                console.log(`Error in finding user : ${err}`);//we print a relevant error message 

                return done(err);//return by telling the error(indicated through err) to passport through the done function

            }

            if(!user || user.password!=password){//if there is no user with the above email(as in the parameter) or the password(as in the parameter) does with match with the user's password

                console.log(`Invalid username/password`);//we print a relevant error message 

                return done(null, false);//return by telling that there is no error while finding the user(indicated through null) and that the authentication is not successful(indicated through false) to passport through the done function

            }
            else{//if the user has been found and the authentication is successful

                return done(null, user);//return by telling that there is no error(indicated through null) and that the authentication is successful(indicated through the user object we're passing) to passport through the done function

            }

        });

    }

));

// serializing the user to decide which key is to be kept inside cookie

passport.serializeUser(function(user, done){//this serializeUser method of passport takes a function containing the user and done as the parameters

    return done(null, user._id);//return by telling passport that there is no error and the key to be kept inside cookie is the user's id

});

// deserializing the user from the key inside cookie(figuring out the user from the cookie data)

passport.deserializeUser(function(id, done){//this deserializeUser method of passport takes a function containing the id and done as the parameters

    User.findOne({_id: id}, function(err, user){//finding a user with the above id(as in the parameter) and we have a callback function to handle the situation

        if(err){//if there is an error while finding a user with the above id(as in the parameter)

            console.log(`Error in finding user : ${err}`);//we print a relevant error message
            return done(err);//return by telling the error to passport

        }

        // not considering the case when a user with the above id(as in the parameter) is not present, because passport stores cookie data in encrypted format and it cannot be altered as such

        return done(null, user);//return by telling passport that there is no error and that the authentication is successful

    });

});

module.exports=passport;//exporting the passport library