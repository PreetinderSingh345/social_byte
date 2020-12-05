const Post=require("../models/post");//requiring the Post model for which the postSchema has been defined

module.exports.create=function(req, res){//create action for handling the requests at "/posts/create" route and we're exporting it, so that it can be accessed inside routes

    Post.create({//creating a new post

        content: req.body.content,//setting the content of the post to that submitted by the user
        user: req.user._id//setting the user who has posted the post to its unique id

    }, function(err, post){//callback function to handle the creation of a new post

        if(err){//if there is an error while creating a new post

            console.log(`Error in creating post : ${err}`);//we print a relevant error message and simply return
            return ;

        }

        return res.redirect("back");//we redirect the user to the current page i.e. reload it, if the post has been created successfully

    });

}