module.exports.profile=function(req, res){//profile controller function/action and we're exporting it, so that it can be accessed in the router section/folder

    return res.render("user_profile", {
        title: "Profile"
    });

}