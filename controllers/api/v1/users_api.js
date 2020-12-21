const User=require("../../../models/user");//requiring the model for which the user schema has been defined
const jwt=require("jsonwebtoken");//requiring the json web token

//createSession action for creating a user session(authenticating the user and returning a jwt if the user is authenticated) and it contains aysnchronous statements which are to be awaited

module.exports.createSession=async function(req, res){    

    try{        

        //finding the user with the help of its email and awating till the user has been found

        let user=await User.findOne({email: req.body.email});

        // if the user entered email is not found or the user's password is not matching, then we return a 403(cannot authorize) status json object with a status and message as the response

        if(!user || req.body.password!=user.password){

            return res.status(403).json({

                status: 403,
                message: "Invalid username/password"

            })

        }

        // if the user has been found, then we return a 200(sucessful) status json object, containing the jwt(made using sign function of jwt, takes the payload data(in json form i.e. to be encrypted), the secret(same as the one defined in the jwt strategy) and the time for which the token is valid(in ms)) inside token field, inside data field, a status and message as the response

        return res.status(200).json({

            data: {
                token: jwt.sign(user.toJSON(), "this_is_jwt_secret", {expiresIn: 60*10*1000})
            },

            status: 200,
            message: "Signed in successfully, above is your token"

        });

    }
    catch(err){

        // if there is an error, then we print an error message, for our reference and return a 500 status json object, with a status and message as the response

        console.log("Error : "+err);
        
        return res.status(500).json({

            status: 500,
            message: "Couldn't sign in"

        });

    }

}