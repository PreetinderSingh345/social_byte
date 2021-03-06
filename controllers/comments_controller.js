const { listIndexes } = require("../models/comment");
const Comment=require("../models/comment");//requiring the Comment model for which the commentSchema is defined
const Post=require("../models/post");//requiring the Post model for which the postSchema is defined

// commented as of now, as the work load is less and there is no need to send an email 

// const commentsMailer=require("../mailers/comments_mailer");//requiring the comments mailer
// const queue = require("../config/kue");//requiring the queue created inside config
// const commentEmailWorker=require("../workers/comment_email_worker");//requiring the comment email worker

module.exports.create=async function(req, res){//creating a create action for handling the requests at "/comments/create" route, we're exporting it so that it can be accessed inside routes and it contains asynchronous statememts which are to be awaited i.e. indicated using async keyword

    try{//enclosing the code within try catch for error handling
        
        let post=await Post.findOne({_id: req.body.post});//finding the post on which the comment has been made with the help of its id and we await the execution of this statement and then move below

        let comment=await Comment.create({//creating a new comment and we await the execution of this statement and then move below

            content: req.body.content,//setting the content of the comment to that submitted by the user
            post: req.body.post,//setting the post for which the comment has been made
            user: req.user._id//setting the user who has made the comment

        });        

        post.comments.push(comment._id);//adding the comment's id to the comments field of the post for which this comment has been made        

        post.save();//telling the database to save the updated post which is currently stored in the ram

        //finding the created comment with the help of its id, populating its user and post fields and this is done so that the comment passed to the new comment function of the comments mailer and as a response to the below xhr request contains its user and post information too

        let foundComment=await Comment.findById(comment._id).populate([{

            path: "user"
        }, {
            path: "post"
        }]);    

        // creating a job for the queue named emails and putting it inside it, passing the above found comment to the job, saving it inside the database and save has a callback associated with it and we print an error message if there is any error

        // commented as of now, as the work load is less

        // let job=queue.create("emails", foundComment).save(function(err){            

        //     if(err){

        //          console.log("Couldn't enqueue job : "+err);
        //          return ;

        //     }           

        // });

        if(req.xhr){//checking if the request is an xhr request                      

            return res.status(200).json({//returing a json object with successful stauts, containing the above found comment inside the comment field, inside data field, the status and a message as the response

                data: {
                    comment: foundComment
                },

                status: 200,

                message: "Comment published"

            });

        }
        else{

            return res.redirect("back");//we redirect the user to the current page i.e. reload it, if the comment has been created successfully

        }

    }
    catch(err){//if there is an error in the code inside try

        if(req.xhr){//checking if the request is an xhr request

            return res.status(500).json({//returning a json object with an internal server error status, containing the status and the message as the response

                status: 500,
                message: "Couldn't publish comment"

            });

        }
        else{

            console.log("Error : "+err);//we print an error message
            return res.redirect("back");//redirecting the user to the current page

        }            

    }    

}

module.exports.destroy=async function(req, res){//destroy action for handling the requests at "/comments/destroy" route, we're exporting it so that it can be accessed inside routes and it contains asynchronous statememts which are to be awaited i.e. indicated using async keyword

    try{//enclosing the code within try catch for error handling

        let comment=await Comment.findById(req.params.id);//finding the comment to be deleted using its id and we await the execution of this statement and then move below

        // making sure that the user can delete the comment iff it was made by the user
        
        if(req.user.id==comment.user){//if the user is authorized to delete the comment
            
            let post=await Post.findByIdAndUpdate(comment.post, {$pull: {comments: req.params.id}});//updating the post on which the comment has been made, by finding the post by its id, pulling from its comments field the comment for which the delete request has been made we await the execution of this statement and then move below                            

            comment.remove();//deleting the comment from the comments collection after the comment has been deleted from the list of comments made on the post the comment belongs to
            
            if(req.xhr){//checking if the request is an xhr request

                return res.status(200).json({//returing a json object with successful stauts, containing the comment id inside the commentId field, inside data field, the status and a message as the response

                    data: {
                        commentId: req.params.id
                    },  

                    status: 200,

                    message: "Comment deleted"

                });

            }
            else{

                return res.redirect("back");//redirecting the user to the current page after the deletion has been done

            }            

        }
        else{//if the user is not authorized to delete the comment

            if(req.xhr){//checking if the request is an xhr request

                return res.status(401).json({//returning a json object with an unauthorized status, containing the status and the message as the response

                    status: 401,
                    message: "You're not signed in"

                });

            }
            else{
                return res.redirect("back");//redirecting the user to the current page
            }      

        }

    }
    catch(err){//if there is an error in the code inside try

        if(req.xhr){//checking if the request is an xhr request

            return res.status(500).json({//returning a json object with an internal server error status, containing the status and the message as the response

                status: 500,
                message: "Couldn't delete comment"

            });

        }
        else{

            console.log("Error : "+err);//we print an error message
            return res.redirect("back");//redirecting the user to the current page

        }    

    }    

}