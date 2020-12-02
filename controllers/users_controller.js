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