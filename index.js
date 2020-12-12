const express=require("express");//requiring express
const app=express();//firing up the express server/app
const port=8000;//port number on which the server is to be run
const expressLayouts=require("express-ejs-layouts");//requiring express ejs layouts
const db=require("./config/mongoose");//requiring the database
const cookieParser=require("cookie-parser");//requiring cookie-parser for parsing the cookie 
const session=require("express-session");//requiring express session(used for session cookie)
const passport=require("passport");//requiring passport
const passportLocal=require("./config/passport-local-strategy");//requiring the passport-local-strategy file we've set up inside config 
const mongoStore=require("connect-mongo")(session);//requiring connect mongo and we are required to pass the session(required above) whose information we are going to store using mongoStore
const sassMiddleware=require("node-sass-middleware");//requiring the node sass middleware
const flash=require("connect-flash");//requiring the connect flash middleware
const customMware=require("./config/middleware");//requiring the custom middleware

app.use(sassMiddleware({//using sass middleware to setup properties for using sass

    src: "./assets/scss",//setting up the source from where the scss files are to be taken and converted into css files while sending to the browser

    dest: "./assets/css",//setting up the destination of the converted css files which are sent to the browser 

    debug: true,//letting errors to be shown up, if any, while the conversion of scss files to css(not to be shown in production mode)

    outputStyle: "expanded",//setting up the output style for the scss code to expanded 
    
    prefix: "/css"//setting up prefix, which is the immediate path after the assets folder where we are to look for the css files

}));

app.use(session({//using middleware to specify the properties of the session cookie

    name: "social_byte",//name of the session cookie
    secret: "this_is_a_secret",//key i.e. used for encryption/decryption purpose(TODO - change the secret before deployment in production mode)

    saveUninitialized: false,//to make sure that we are not storing extra data inside the session cookie, when the user is not signed in 

    resave: false,//to make sure that we are not saving the session unnecessarily even when it is not changing

    cookie: {
        maxAge: (100*60*1000),//after 100 minutes, the session cookie will expire(time is provided in milli seconds)
    },

    store: new mongoStore({//to store the session cookie using mongoStore to make sure that the user is not signed out after a server restart, so we create an instance of mongoStore to do the same
        
        mongooseConnection: db,//the instance of mongoStore created above requires a connection to the database
        autoRemove: "disabled",//disabling the automatical removal of the session cookie

    }, function(err){//callback function to handle any error while trying to setup connect-mongo 

        if(err){//if there is an error while trying to setup connect-mongo

            console.log(`Error in setting up connect-mongo : ${err}`);//we print a relevant error message and simply return 
            return ;

        }        

        console.log("Successfully setup connect-mongo");//we print a confirmation message if connect-mongo is successfully setup

    })

}));

app.use(passport.initialize());//using middleware to tell the server to initialize passport
app.use(passport.session());//using middleware to tell the server to create a passport session

app.use(passport.setAuthenticatedUser);//using middleware to obtain the user from the session cookie

app.use(flash());//using middleware to set up flash messages and it is done after the session cookie has been created as the flash messages are contained inside the session cookie(this will make sure that the message is available to the next page i.e. to be rendered)

app.use(customMware.setFlash);//using setFlash middleware defined inside middleware file inside config folder to set the flash message

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