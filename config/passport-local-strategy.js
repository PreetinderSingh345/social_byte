const passport=require("passport");//requiring passport 
const LocalStrategy=require("passport-local").Strategy;//requiring the passport-local strategry
const User=require("../models/user");//requiring the User model for which the userSchema is defined

// authentication using passport

passport.use(new LocalStrategy({//telling passport to use the local strategy we've required above

    usernameField: "email",//defining the usernameField as "email"(unique for each and every user)
    passReqToCallback: true//passing the request object to the callback function, so that we can define the flash messages

}, 

    function(req, email, password, done){//defining the callback function inside the local strategy which takes the email, passsword and done(function used for reporting to passport and can have any other name too) as the parameters

        User.findOne({email: email}, function(err, user){//finding a user with the above email(as in the parameter) and we have a callback function to handle the situation

            if(err){//if there is an error while finding a user with the above email(as in the parameter)
                
                req.flash("error", "Cannot authenticate user");//adding a relevant flash message

                return done(err);//return by telling the error(indicated through err) to passport through the done function

            }

            if(!user || user.password!=password){//if there is no user with the above email(as in the parameter) or the password(as in the parameter) does with match with the user's password

                req.flash("error", "Invalid username/password");//adding a relevant flash message

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

// check if the user is authenticated

passport.checkAuthentication=function(req, res, next){//this checkAuthentication function is used to check whether the user has been authenticated or not and it is a middleware taking req, res and next as the parameters

    if(req.isAuthenticated()){//if the user is authenticated/signed-in(checked using inbuilt isAuthenticated function), then we let the next middleware be executed and the user can view the profile page

        return next();

    }

    req.flash("error", "You're not signed in");//adding a relevant flash message

    // if the user is not authenticated/signed-in, then we redirect the user to the sign in page
    return res.redirect("/users/sign-in");

}

// setting the authenticated user

passport.setAuthenticatedUser=function(req, res, next){//this setAuthenticatedUser function is used to obtain the user from the session cookie for the response and it is a middleware taking req, res and next as the parameters

    if(req.isAuthenticated()){//if the user is authenticated/signed-in

        res.locals.user=req.user;//setting res.locals.user object i.e. used for providing the dynamic user data inside views to req.user object i.e. obtained from the session cookie

    }

    return next();//let the next middleware be executed

}

module.exports=passport;//exporting the passport library