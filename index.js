const express=require("express");//requiring express
const app=express();//firing up the express server/app
const port=8000;//port number on which the server is to be run
const expressLayouts=require("express-ejs-layouts");//requiring express ejs layouts
const db=require("./config/mongoose");//requiring the database
const cookieParser=require("cookie-parser");//requiring cookie-parser for parsing the cookie 
const session=require("express-session");//requiring express session(used for session cookie)
const passport=require("passport");//requiring passport
const passportLocal=require("./config/passport-local-strategy");//requiring the passport-local-strategy file we've set up inside config 

app.use(session({//using middleware to specify the properties of the session cookie

    name: "social_byte",//name of the session cookie
    secret: "this_is_a_secret",//key i.e. used for encryption/decryption purpose(TODO - change the secret before deployment in production mode)
    saveUninitialized: false,
    resave: false,

    cookie: {
        maxAge: (100*60*1000),//after 100 minutes, the session cookie will expire(time is provided in milli seconds)
    }

}));

app.use(passport.initialize());//using middleware to tell the server to initialize passport
app.use(passport.session());//using middleware to tell the server to create a passport session

app.use(express.urlencoded());//using middleware to decode the incoming request with the help of a parser function, so that we can access req.body object

app.use(cookieParser());//using middleware to decode the cookie data, so that we can access req.cookies object, use res.cookie() etc.

app.use(expressLayouts);//using middleware to tell the sever that we are using the above required express layouts(to be told before a request is handled, i.e. before the routes are handled using the below middleware)

app.use(express.static("./assets"));//using middleware to tell the location of where the server has to look for static data like - css, js, images etc.

app.set("view engine", "ejs");//telling the server about the view engine we're using
app.set("views", "./views");//providing the path to the views section/folder 

app.set("layout extractStyles", true);//extracting the styles and scripts from different files inside views(home  etc.) into the layout file
app.set("layout extractScripts", true);

app.use("/", require("./routes/index"));//using middleware to tell the browser that all the incoming requests should be handled by the index file in the routes folder

app.listen(port, function(err){//telling the app to listen at the port number 8000 

    if(err){//checking if there is an error or not while running the server and showing a message accordingly
        console.log(`Error in running the server : ${err}`);
        return ;
    }

    console.log(`Server is up and running on port : ${port}`);

});