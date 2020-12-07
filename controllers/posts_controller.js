const Post=require("../models/post");//requiring the Post model for which the postSchema has been defined
const Comment=require("../models/comment");//requiring the Comment model for which the commentSchema has been defined

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

module.exports.destory=function(req, res){//destroy action for handling the requests at the "/posts/destroy" route and we exporting it, so that it can be accessed inside routes

    Post.findById(req.params.id, function(err, post){//find the post to be deleted by its id i.e. obtained from the string params and we have a callback function to handle the situation

        if(err){//if there is an error while finding the user

            console.log(`Error in fetching the post : ${err}`);//we print a relevant error message and simply return
            return ;
        
        }

        //authorizing whether the user is allowed to delete the post or not by checking if the user who is trying to delete the post is the one who made it

        if(req.user.id==post.user){//if the user is authorized to delete the post and we are accessing the id as .id which gives the id in the string format and this format is preferred for ObjectId comparision

            Comment.deleteMany({post: req.params.id}, function(err){//deleting all the comments linked with the post and we have a callback function to handle the situation

                if(err){//if there is an error while deleting the comments

                    console.log(`Error while deleting the comments : ${err}`);//we print a relevant error message and simply return 
                    return ;

                }

                post.remove();//removing the post after deleting all the comments associated with it

                return res.redirect("back");//redirecting the user to the current page i.e. reloading it in case the post and its related comments have been deleted successfully

            });

        }
        else{//if the user is not authorized to delete the post

            return res.redirect("back");//redirecting the user to the current page i.e. reloading it 
            
        }
        
    });

}