const User=require("../models/user");//requiring the User model for which the userSchema has been defined
const path=require("path");
const fs=require("fs");

module.exports.profile=function(req, res){//profile controller function/action and we're exporting it, so that it can be accessed in the router section/folder

    return res.render("user_profile", {

        title: "Profile",//providing the dynamic title and the user_profile
        user_profile: req.user//cannot use locals.user here which is accessible inside views when we are sending a response to the browser, but we can access the user through the request as done here 

    });

}

module.exports.signUp=function(req, res){//signUp action for handling the sign up requests and we're exporting it, so that it can be accessed inside routes

    if(req.isAuthenticated()){//redirecting the user to the profile page in case the user is authenticated/signed in 
        req.flash("success", "You're signed in");//adding a relevant flash message

        return res.redirect("/users/profile");//redirecting the user to the profile page

    }
    else{//rendering the sign up page in case the user is not signed in 

        return res.render("user_sign_up", {
        title: "Sign Up" 
        });

    }

}

module.exports.signIn=function(req, res){//signIn action for handling the sign in requests and we're exporting it, so that it can be accessed inside routes

    if(req.isAuthenticated()){//redirecting the user to the profile page in case the user is authenticates/signed in 
        req.flash("success", "You're signed in");//adding a relevant flash message

        return res.redirect("/users/profile");//redirecting the user to the profile page
        
    }
    else{//rendering the sign in page in the case the user is not signed in 
    
        return res.render("user_sign_in", {
            title: "Sign In"
        });

    }

}

module.exports.create=function(req, res){//create action for handling the create requests and we're exporting it, so that it can be accessed inside routes

    // return res.end("<h1>Creating a user</h1>");

    if(req.body.password!=req.body.confirm_password){//if the password and confirm password entered by the user are not same, then we redirect back to/reload the sign up page where the user has to enter the details again

        req.flash("error", "Passwords do not match");//adding a relevant flash message

        return res.redirect("back");//redirecting the user to the current page

    }

    // if the password and confirm password entered by the user are same

    User.findOne({email: req.body.email}, function(err, user){//try to find an existing user with email same as that entered by the user trying to sign up and have a corresponding callback function to handle the situation

        if(err){//if there is an error while finding an existing user with the same email

            req.flash("error", "Cannot create user");//adding a relevant flash message

            return res.redirect("back");//redirecting the user to the current page

        }

        // if there is no error while finding an existing user with the same email

        if(user){//if a user with the same email was found then we redirect back to the sign up page as we cannot create another user with the same email as email id is meant to be unique for each user

            req.flash("error", "Cannot create user");//redirecting the user to the current page

            return res.redirect("back");//redirecting the user to the current page

        }
        else{//if no user with the same email was found

            User.create(req.body, function(err, user){//create a new user and the values of the fields in the schema are taken from this req.body object and we have a corresponsing callback function too

                if(err){//if there is an error while creating a new user

                    req.flash("error", "Cannot create user");//adding a relevant flash message

                    return res.redirect("back");//redirecting the user to the current page

                }

                req.flash("success", "User created successfully");

                return res.redirect("/users/sign-in");//if a new user has successfully been created, then we redirect the user to the sign in page

            });

        }

    });

}

module.exports.createSession=function(req, res){//createSession action for handling the create session requests and we're exporting it, so that it can be accessed inside routes

    req.flash("success", "Logged in successfully");//setting up the flash message to be shown, is of type success and displays the above message when the user has logged in successfully

    return res.redirect("/");//redirecting the user to the home page when a session is successfully created after authentication through passport

}

module.exports.destroySession=function(req, res){//destroySession action for handling the sign out requests and we're exporting it, so that it can be accessed inside routes

    req.logout();//calling the logout function given to the request via passport(just like isAuthenticated), to remove the session cookie 

    req.flash("success", "Logged out successfully");//setting up the flash message to be shown, is of type success and displays the above message when the user has logged out successfully
    
    return res.redirect("/");//redirecting the user to the home page after the session is destroyed i.e. the user is signed out

}

module.exports.friendsProfile=function(req, res){//friendsProfile action for handling the profile requests of a specific user and we're exporting it so that it can be accessed inside routes

    User.findById(req.params.id, function(err, user){//finding the user with the help of its id(obtained from string params) and we have a callback function to handle the sitution

        if(err){//if there is an error while getting the user

            req.flash("error", "Cannot get user");//adding a relevant flash message

            return res.redirect("back");//redirecting the user to the current page

        }

        return res.render("user_profile", {//rendering the user_profile page of the particular user as the reponse

            title: "Profile",//providing the dynamic title and the user object

            user_profile: user//we have not accessed the user inside user_profile page as user, so that the it does not interfere with the locals.user object

        })

    });

}

module.exports.update=async function(req, res){//update action for handling the update requests, we're exporting it, so that it can be accessed inside routes and async keyword to indicate that this function contains asynchronous statements which are to be awaited at

    try{

        // the body parser is not able to parse a multiform enctype form, so we have to access infomation via a multer function as done below, using the static uploaded avatar function 

        User.uploadedAvatar(req, res, async function(){//the callback function contains asynchronous statements which have to be awaited, indicated using async
            
            // the multer error will be handled by the catch statement           

            if(req.params.id==req.user.id){//making sure that the profile to be updated is of the user who is signed in

                // making sure that the id of the user is not updated to an already existing value in the database as email is unique for each user
    
                let user=await User.findOne({email: req.body.email});//finding a user with the email as sent by the signed in user thorugh the update form and we await till this statement is completed

                if(!user || user.id==req.user.id){//if there is no existing user with the same email or is the one who is updating its profile

                    let user=await User.findByIdAndUpdate(req.params.id, req.body);//finding the user by its id(obtained from string params), updating it and we await till this statement is completed
                        
                    req.flash("success", "User updated successfully");//adding a relevant flash message
                    
                    if(req.file){//if a file(avatar picture) has been sent through the form
                                            
                        if(user.avatar){//checking if the user already has an avatar 

                            fs.unlinkSync(path.join(__dirname, "..", user.avatar));//removing that avatar and setting a new one as done below                           

                        }

                        user.avatar=User.avatarPath+"/"+req.file.filename;//saving the path of the user's avatar picture in its avatar field                        

                        user.save();//saving the user 

                        return res.redirect("back");//redirecting the user to the current page

                    }                                   

                    return res.redirect("back");//redirecting the user to the current page after the profile has been updated
    
                }
                else{//if there is a user with the same email and is not the one who is updating its profile

                    req.flash("error", "Email already taken");//adding a relevant flash message

                    return res.redirect("back");//redirecting the user to the current page

                }
                    
            }
            else{//if the profile to be updated is not of the user who is signed in
    
                req.flash("warning", "You're not signed in");//adding a relevant flash message
    
                return res.redirect("/users/sign-in");//redirecting the user to sign in page
    
            }

        });        

    }
    catch(err){//if there is an error within the above try

        console.log("Error : "+err);//we print a relevant error message 
        return res.redirect("back");//redirecting the user to the current page

    }

}