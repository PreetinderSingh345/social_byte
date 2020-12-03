module.exports.home=function(req, res){//home controller function/action and we are exporting it, so that it can be accesssed in the router section/folder

    // ** since we don't want any sample cookie data to be present with the actual user_id key in the cookie, so we're deleting the previous sample cookie data from the application section from the browser side and are commenting this part where we accessed and altered that sample cookie data **

    // // created some sample cookies from the browser side

    // console.log(req.cookies);//accessing the sample cookies from the server side    

    // // altering specific cookie key-value pairs from the server side and send them as the response to the browser

    // res.cookie("user_name", "ghijk");//initial value of "user_name" key was - "abcde"
    // res.cookie("user_id", 67890);//initial value of "user_id" key was - "12345"

    return res.render("home", {//rendering the home page and providing the dynamic content
        title: "Home"
    });

};