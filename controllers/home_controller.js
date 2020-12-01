module.exports.home=function(req, res){//home controller function/action and we are exporting it, so that it can be accesssed in the router section/folder

    return res.render("home", {//rendering the home page and providing the dynamic content
        title: "Home"
    });

};