const express=require("express");//requiring express and its existing instance will be used
const router=express.Router();//getting the router
const postsApi=require("../../../controllers/api/v1/posts_api");//getting the posts api controller

router.get("/", postsApi.index);//for handling the requests at "/" route, we use the index action of the posts api controller

module.exports=router;//exporting the router, so that it can be accessed by the server to handle the incoming requests