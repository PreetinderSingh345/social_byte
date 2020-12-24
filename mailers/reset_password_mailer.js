const nodeMailer=require("../config/nodemailer");//requiring nodemailer and its existing instance will be used

// defining and exporting the resetPassword function which takes the email as the argument, sends an email to the user for whose email reset password was requested and render the reset_password page inside reset_password folder inside views. We have a callback and we print an error message in case of an error

exports.resetPassword=(email)=>{

    let htmlString=nodeMailer.renderTemplate({}, "/reset_passwords/reset_password.ejs");
    
    nodeMailer.transporter.sendMail({

        from: "demo12345user67890@gmail.com",
        to: email,
        subject: "Change password",
        html: htmlString

    }, (err, info)=>{

        if(err){

            console.log("Couldn't send mail : "+err);
            return ;

        }

    });

}