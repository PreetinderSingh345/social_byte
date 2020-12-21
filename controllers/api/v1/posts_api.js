module.exports.index=function(req, res){//index action for listing out the posts

    return res.status(200).json({//returning a json object with successful status containing the posts(emtpy as of now) field, inside data field and a message as the response

        data: {
            posts: []
        },

        message: "List of posts"

    });

}