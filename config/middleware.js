module.exports.setFlash=function(req, res, next){//using middleware to set the flash message

    res.locals.flash={//defining the response flash message i.e. used by the views with the help of the request flash message

        "success": req.flash("success"),//defining the success, error and warning flash messages for the response by taking the flash messages from the request

        "error": req.flash("error"),

        "warning": req.flash("warning")

    }

    next();//to pass the control to the next middleware

}