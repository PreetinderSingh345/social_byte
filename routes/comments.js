const express=require("express");//requiring express and its existing instance will be used
const router=express.Router();//getting the router
const commentsController=require("../controllers/comments_controller");//getting the comments controller
const passport=require("passport");//requiring passport

router.post("/create", passport.checkAuthentication, commentsController.create);//for handling the requests at "/create" route, we call the create action of the commentsController and we are using checkAuthentication as a middleware for making sure the user can comment only when it is signed in(this extra check is added so that the user is directed to the sign in page in case the user tries to send a comment by altering the home page's HTML)

router.get("/destroy/:id", passport.checkAuthentication, commentsController.destroy);//for handling the requests at "/destroy" route(id is passed as a string param which contains the id of the comment to be deleted), we call the destroy action of the commentsController and checkAuthentication is used as a middleware for making sure that the user can delete the comment only when it is signed in(this extra check is added so that the user is directed to the sign in page in case the user tries to delete a comment by altering the home page's HTML)

module.exports=router;//exporting the router, so that it can be acccessed by the index.js file of the routes folder to direct the "/comments" requests to this file