const User=require("../models/user");//requiring the User model for which the userSchema has been defined

module.exports.profile=function(req, res){//profile controller function/action and we're exporting it, so that it can be accessed in the router section/folder

    return res.render("user_profile", {
        title: "Profile"
    });

}

module.exports.signUp=function(req, res){//signUp action for handling the sign up requests and we're exporting it, so that it can be accessed inside routes

    return res.render("user_sign_up", {
       title: "Sign Up" 
    });

}

module.exports.signIn=function(req, res){//signIn action for handling the sign in requests and we're exporting it, so that it can be accessed inside routes

    return res.render("user_sign_in", {
        title: "Sign In"
    });

}

module.exports.create=function(req, res){//create action for handling the create requests and we're exporting it, so that it can be accessed inside routes

    // return res.end("<h1>Creating a user</h1>");

    if(req.body.password!=req.body.confirm_password){//if the password and confirm password entered by the user are not same, then we redirect back to/reload the sign up page where the user has to enter the details again

        return res.redirect("back");
    }

    // if the password and confirm password entered by the user are same

    User.findOne({email: req.body.email}, function(err, user){//try to find an existing user with email same as that entered by the user trying to sign up and have a corresponding callback function to handle the situation

        if(err){//if there is an error while finding an existing user with the same email

            console.log(`Error in finding user while sign up : ${err}`);//we print a relevant error message and simply return in this case

            return ;

        }

        // if there is no error while finding an existing user with the same email

        if(user){//if a user with the same email was found then we redirect back to the sign up page as we cannot create another user with the same email as email id is meant to be unique for each user

            return res.redirect("back");

        }
        else{//if no user with the same email was found

            User.create(req.body, function(err, user){//create a new user and the values of the fields in the schema are taken from this req.body object and we have a corresponsing callback function too

                if(err){//if there is an error while creating a new user

                    console.log(`Error in creating user while sign up : ${err}`);//we print a relevant error message and simply return in this case
                    return ;

                }

                return res.redirect("/users/sign-in");//if a new user has successfully been created, then we redirect the user to the sign in page

            });

        }

    });

}

module.exports.createSession=function(req, res){//createSession action for handling the create session requests and we're exporting it, so that it can be accessed inside routes

    // return res.end("<h1>Creating a session</h1>");

    return res.redirect("/");//redirecting the user to the home page when a session is successfully created after authentication through passport

}