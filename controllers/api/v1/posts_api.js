const Post=require("../../../models/post");//getting the model for which the post schema has been defined

const Comment=require("../../../models/comment");//getting the model for which the comment schema has been defined

module.exports.index=async function(req, res){//index action for listing out the posts and this function contains asynchronous statements which are to be awaited(indicated using async)

    let posts=await Post.find({})//finding all the posts
    .sort("-createdAt")//sorting the posts in reverse chronological order
    .populate("user")//populating the user of each post 
    .populate({

        path: "comments",//populating the comments of each post

        options: {
            sort:{
                "createdAt": -1//sorting the comments in reverse chronological order
            }
        },

        populate: {
            path: "user"//populating the user of each comment
        }

    });//we await this statement to complete

    return res.status(200).json({//returning a json object with successful status containing the posts inside the posts field, inside data field and a message as the response

        data: {
            posts: posts
        },

        message: "List of posts"

    });

}

module.exports.destroy=async function(req, res){//destroy action for deleting a post and this function contains asynchronous statements which are to be awaited(indicated using async)

    try{

        let post=await Post.findById(req.params.id);//finding the post by its id(obtained from string param) and awating this statement to complete

        if(req.user.id==post.user){//checking if the user who is trying to delete the post is the one who made it i.e. authorizing the request

            await Comment.deleteMany({post: req.params.id});//deleting the comments associated with the above post and awating this statement to complete

            post.remove();//deleting the post
                                
            return res.status(200).json({//returning a json object, with successful status, containing the id of the deleted post inside postId field, inside data field, status and a message as the response

                data:{
                    postId: req.params.id
                },

                status: 200,

                message: "Post and associated comments deleted"

            });  

        }
        else{//if the user is not authorized to delete the post

            return res.status(410).json({//returning a json object, with unauthorized status and a status and message as the response

                status: 401,
                message: "You cannot delete this post"

            });

        }   

    }
    catch(err){//if there is an error in the above code within try     

        console.log("Error : "+err);//we print an error message(for our reference)

        return res.status(500).json({//returning a json object, with internal server error status, containing the status and a message as the response

            status: 500,
            message: "Couldn't delete post"

        });      

    }

}