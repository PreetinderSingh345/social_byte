const Post=require("../models/post");//requiring the Post model for which the postSchema has been defined
const Comment=require("../models/comment");//requiring the Comment model for which the commentSchema has been defined

module.exports.create=async function(req, res){//create action for handling the requests at "/posts/create" route ,we're exporting it so that it can be accessed inside routes and we are indicating that this action contains asynchronous statements which have to be waited using async keyword

    try{//enclosing the code within try catch for handling the errors

        let post=await Post.create({//creating a new post and awaiting till the execution of this statement is complete

            content: req.body.content,//setting the content of the post to that submitted by the user
            user: req.user._id//setting the user who has posted the post to its unique id

        });        

        return res.redirect("back");//we redirect the user to the current page i.e. reload it after the post has been created successfully

    }
    catch(err){//if there is any error in the code within try

        console.log("Error : "+err);//we print a relevant error message and simply return
        return ;

    }

}

module.exports.destory=async function(req, res){//destroy action for handling the requests at the "/posts/destroy" route, we exporting it so that it can be accessed inside routes and we are indicating that this function contains asynchronous statements which will have to be awaited using the async keyword

    try{//enclosing the code within try catch for error handling

        let post=await Post.findById(req.params.id);//finding the post to be deleted using its id obtained from the string params

        //authorizing whether the user is allowed to delete the post or not by checking if the user who is trying to delete the post is the one who made it

        if(req.user.id==post.user){//if the user is authorized to delete the post and we are accessing the id as .id which gives the id in the string format and this format is preferred for ObjectId comparision

            await Comment.deleteMany({post: req.params.id});//deleting all the comments which are linked to the post to be deleted

            post.remove();//removing the post after deleting all the comments associated with it

            return res.redirect("back");//redirecting the user to the current page i.e. reloading it in case the post and its related comments have been deleted successfully            

        }
        else{//if the user is not authorized to delete the post

            return res.redirect("back");//redirecting the user to the current page i.e. reloading it 
            
        }

    }
    catch(err){//if there is any error in the code within try

        console.log("Error : "+err);//we print a relevant error message and simply return
        return ;

    }

}