const nodemailer=require("nodemailer");//requiring nodemailer
const ejs=require("ejs");//requiring ejs
const path=require("path");//requiring the path module

// defining the transporter object, using the createTransport nodemailer function which is used to send mail via smtp protocol and it consists of options - service we're going to use(gmail), the host and port values that are smpt.gmail.com(domain i.e. created to interact with gmail for developers) and 587 as we're using tls as the security option, secure is set to false as we don't want to use ssl as the security option and in the auth section and we provide the email and password through which an email is sent to the user inside auth

let transporter=nodemailer.createTransport({

    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {

        user: "demo12345user67890@gmail.com",
        pass: "sending an email works fine and will turn this feature on securely in production mode"

    }

});

// defining the template for the email i.e. sent to the user's account on gmail, it is a function comprising of the html data to be sent to the user i.e. mailHtml and the relativePath from where the mail is being sent as the arguments, inside the function, we define the mailHtml(html page i.e. to be sent to the user's mail), the path to the ejs file i.e. to be rendered along with the place from where ejs.renderFile is being called i.e. the relative path, the data i.e. to be sent to the rendered file and a callback function containing err and template as the arguments, if there is no error, then we initialize mailHtml to the template and finally we return the mailHtml from the below function

let renderedTemplate=function(data, relativePath){

    let mailHtml;

    ejs.renderFile(

        path.join(__dirname, "../views/mailers", relativePath),
        data,    

        function(err, template){

            if(err){

                console.log("Error : "+err);
                return ;

            }

            mailHtml=template

        }

    );

    return mailHtml;

}

// exporting the transporter(communication with the mail service porvider takes place through it) and renderTeamplate(provides the html content of the mail to be sent), so that they can be used wherever required

module.exports={

    transporter: transporter,
    renderTemplate: renderedTemplate

}