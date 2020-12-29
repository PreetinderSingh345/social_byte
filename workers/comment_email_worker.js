// commented as of now, as the work load is less

// const queue=require("../config/kue");//requiring the queue created inside config

// const commentsMailer=require("../mailers/comments_mailer");//requiring the comments mailer, whose call will be sent inside the queue

// //defining the process function for the queue, which tells the queue to execute the code for a job and we pass to this function the queue name and a callback function with a job(containg the function to be executed when this job has to be processed and the data associated with the function) and a callback function as the arguments

// queue.process("emails", function(job, done){

//     // passing the job data to the new comment function of the comments mailer and then the callback is called

//     commentsMailer.newComment(job.data);
//     done();

// });