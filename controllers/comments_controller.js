const { listIndexes } = require("../models/comment");
const Comment=require("../models/comment");//requiring the Comment model for which the commentSchema is defined
const Post=require("../models/post");//requiring the Post model for which the postSchema is defined

module.exports.create=function(req, res){//creating a create action for handling the requests at "/comments/create" route and we're exporting it, so that it can be accessed inside routes

    Post.findOne({_id: req.body.post}, function(err, post){//finding the post on which the comment has been made with the help of its id and we have a callback function to handle the sitution

        if(err){//if there is an error while finding the post

            console.log(`Error in finding post : ${err}`);//we print a relevant error message and simply return
            return ;

        }

        Comment.create({//creating a new comment

            content: req.body.content,//setting the content of the comment to that submitted by the user
            post: req.body.post,//setting the post for which the comment has been made
            user: req.user._id//setting the user who has made the comment
    
        }, function(err, comment){//callback function to handle the creation of a new comment
    
            if(err){//if there is an eror while creating a new comment
    
                console.log(`Error in creating comment : ${err}`);//we print a relevant error message and simply return
                return ;
    
            }               

            post.comments.push(comment._id);//adding the comment's id to the comments field of the post for which this comment has been made

            post.save();//telling the database to save the updated post which is currently stored in the ram
    
            return res.redirect("back");//we redirect the user to the current page i.e. reload it, if the comment has been created successfully
    
        });

    });  

}

module.exports.destroy=function(req, res){//destroy action for handling the requests at "/comments/destroy" route and we're exporting it so that it can be accessed inside routes

    Comment.findById(req.params.id, function(err, comment){//finding the comment to be deleted using its id and we have a callback function to handle the situation

        if(err){//if there is an error while finding the comment

            console.log(`Error in fetching the comment : ${err}`);//we print a relevant error message and simply return
            return ;

        }

        // making sure that the user can delete the comment iff it was made by the user
        
        if(req.user.id==comment.user){//if the user is authorized to delete the comment
            
            Post.findByIdAndUpdate(comment.post, {$pull: {comments: req.params.id}}, function(err){//updating the post on which the comment has been made, by finding the post by its id and pulling from its comments field the comment for which the delete request has been made
                
                if(err){//if there is an error while finding/updating the post 

                    console.log(`Error in finding/updating the post : ${err}`);//we print a relevant error error message and simply return
                    return ;

                }            

            });

            comment.remove();//deleting the comment from the comments collection after the comment has been deleted from the list of comments made on the post the comment belongs to

            return res.redirect("back");//redirecting the user to the current page after the deletion has been done

        }
        else{//if the user is not authorized to delete the comment

            return res.redirect("back");//redirecting the user to the current page 

        }

    });

}