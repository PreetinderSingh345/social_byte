const { listIndexes } = require("../models/comment");
const Comment=require("../models/comment");//requiring the Comment model for which the commentSchema is defined
const Post=require("../models/post");//requiring the Post model for which the postSchema is defined

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

        return res.redirect("back");//we redirect the user to the current page i.e. reload it, if the comment has been created successfully

    }
    catch{//if there is an error in the code inside try

        console.log("Error : "+err);//we print a relevant error message and simply return
        return ;

    }    

}

module.exports.destroy=async function(req, res){//destroy action for handling the requests at "/comments/destroy" route, we're exporting it so that it can be accessed inside routes and it contains asynchronous statememts which are to be awaited i.e. indicated using async keyword

    try{//enclosing the code within try catch for error handling

        let comment=await Comment.findById(req.params.id);//finding the comment to be deleted using its id and we await the execution of this statement and then move below

        // making sure that the user can delete the comment iff it was made by the user
        
        if(req.user.id==comment.user){//if the user is authorized to delete the comment
            
            let post=await Post.findByIdAndUpdate(comment.post, {$pull: {comments: req.params.id}});//updating the post on which the comment has been made, by finding the post by its id, pulling from its comments field the comment for which the delete request has been made we await the execution of this statement and then move below                            

            comment.remove();//deleting the comment from the comments collection after the comment has been deleted from the list of comments made on the post the comment belongs to

            return res.redirect("back");//redirecting the user to the current page after the deletion has been done

        }
        else{//if the user is not authorized to delete the comment

            return res.redirect("back");//redirecting the user to the current page 

        }

    }
    catch{//if there is an error in the code inside try

        console.log("Error : "+err);//we print a relevant error message and simply return
        return ;

    }    

}