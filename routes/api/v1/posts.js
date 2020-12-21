const express=require("express");//requiring express and its existing instance will be used
const router=express.Router();//getting the router
const postsApi=require("../../../controllers/api/v1/posts_api");//getting the posts api controller

router.get("/", postsApi.index);//for handling the requests at "/" route, we use the index action of the posts api controller

router.delete("/destroy/:id", postsApi.destroy);//for handling the requests at "/destroy" route(id is the string param containing the id of the post to be deleted), we use the destroy action of the posts api controller

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests