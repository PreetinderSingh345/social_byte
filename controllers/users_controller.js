const User=require("../models/user");//requiring the User model for which the userSchema has been defined

module.exports.profile=function(req, res){//profile controller function/action and we're exporting it, so that it can be accessed in the router section/folder

    if(!req.cookies.user_id){//in case the user's identity is not stored inside the cookie, then the user is not signed in, so we redirect the user to the sign in page

        return res.redirect("/users/sign-in");

    }
    else{//in case the user's identity is stored inside the cookie, then the user is signed in 

        User.findOne({_id: req.cookies.user_id}, function(err, user){//find the user with the help of its id, which is unique for every user and we have a corresponding callback function to handle the situation

            if(err){//if there is an error while finding the user

                console.log(`Error in finding user while fetching profile : ${err}`);//we print a relevant error message and simply return 

                return ;

            }

            if(!user){//if there is no user with the id as stored in the cookie(for e.g. if someone alters the cookie data), then we redirect the user to the sign in page 

                return res.redirect("/users/sign-in");

            }
            else{//if there is a user with the id as stored in the cookie

                return res.render("user_profile", {//we render the profile page as the response with the dynamic data(title and user object) 

                    title: "Profile",
                    user: user            

                });

            }

        });

    }    

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

    User.findOne({email: req.body.email}, function(err, user){//finding a user with the email the user has provided while trying to sign in and we have a corresponding callback function to handle the situation
        
        if(err){//if there is an error while finding a user with the provided email 
            
            console.log(`Error in finding user while sign in : ${err}`);//we print a relevant error message and simply return 

            return ;

        }

        if(!user){//if there is no user with the provided email, then we redirect back to the sign in page
            return res.redirect("back");
        }
        else{//if a user has been found with the provided email

            if(user.password!=req.body.password){//if the user has not entered the password correctly, then we redirect back to the sign in page 

                return res.redirect("back");

            }

            // if the user has been authenticated with the help of email(unique) and password

            res.cookie("user_id", user.id);//create a key-value pair for user id in the cookie(this id is unique for each user)

            // return res.redirect("/users/profile");//redirect the user to the profile page

            return res.render("user_profile", {//rendering the user_profile page as the response along with the dynamic content of title, name and email

                title: "Profile",
                user: user

            });

        }        

    });

}