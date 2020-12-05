const Post=require("../models/post");//requiring the Post model for which the postSchema has been defined

module.exports.home=function(req, res){//home controller function/action and we are exporting it, so that it can be accesssed in the router section/folder

    // ** the below part where we accessed and altered the sample cookie data created from browser side is commented(cleared the sample cookie data from the browser side too) as we don't want the sample cookie data to interfere with the cookie data created by passport **

    // // created some sample cookies from the browser side

    // console.log(req.cookies);//accessing the sample cookies from the server side    

    // // altering specific cookie key-value pairs from the server side and send them as the response to the browser

    // res.cookie("user_name", "ghijk");//initial value of "user_name" key was - "abcde"
    // res.cookie("user_id", 67890);//initial value of "user_id" key was - "12345"

    // finding all the posts

    Post.find({}).populate("user").exec(function(err, posts){//finding all the posts(all the posts will be returned as we have not passed any search criteria inside {}) and we are populating the user field of each found post to get the user object from its id(pre-populating the user) and we have a callback function inside exec() to handle the situation

        if(err){//if there is an error while finding the posts

            console.log(`Error in fetching the posts : ${err}`);//we print a relevant error message and simply return
            return ;

        }

        // if the posts have been found successfully

        return res.render("home", {//rendering the home page as the response

            title: "Home",//providing the dynamic title and posts object
            posts: posts

        });

    });    

};