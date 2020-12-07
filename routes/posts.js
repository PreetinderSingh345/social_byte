const express=require("express");//requiring express and its existing instance will be used
const router=express.Router();//getting the router
const postsController=require("../controllers/posts_controller");//getting the posts controller
const passport=require("passport");//requiring passport

router.post("/create", passport.checkAuthentication, postsController.create);//for handling the requests at "/create" route, we call the create action of the postsController and we're using checkAuthentication as a middleware for making sure a user can post only when it is signed in(this extra check is added so that the user is directed to the sign in page in case the user tries to send a post by altering the home page's HTML) 

router.get("/destroy/:id", passport.checkAuthentication, postsController.destory);//for handling the requests at "/destroy" route(id is passed as a string param which contains the id of the post to be deleted), we call the destroy action of the postsController and we're using checkAuthentication as a middleware for making sure a user can delete a post only when it is signed in(this extra check is added so that the user is directed to the sign in page in case the user tries to delete a post by altering the home page's HTML)

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests