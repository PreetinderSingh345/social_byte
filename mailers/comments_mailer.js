const nodeMailer=require("../config/nodemailer");//requiring the nodemailer configuration, setup inside the config folder

// defining and exporting new comment function which takes the comment made by a user as the argument and uses the sendMail function of nodemailer's transporter to send an email to the user, we provide to it the from, to, subject and the html content of the email and there is a callback consisting of error and information as the arguments and we print an error message, in case the mail couldn't be sent

exports.newComment=(comment)=>{

    nodeMailer.transporter.sendMail({

        from: "demo12345user67890@gmail.com",
        to: comment.user.email,
        subject: "New comment published",
        html: `<h1>Comment - ${comment.content}</h1>
        <h2> made on post - ${comment.post.content} `

    }, (err, info)=>{

        if(err){

            console.log("Couldn't send mail : "+err);
            return ;

        }        

    });

}