const express=require("express");//requiring express
const app=express();//firing up the express server/app
const port=8000;//port number on which the server is to be run


app.listen(port, function(err){//telling the app to listen at the port number 8000 

    if(err){//checking if there is an error or not while running the server and showing a message accordingly
        console.log(`Error in running the server : ${err}`);
        return ;
    }

    console.log(`Server is up and running on port : ${port}`);

});