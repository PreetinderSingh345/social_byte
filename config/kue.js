const kue=require("kue");//requiring kue
const queue=kue.createQueue();//creating a queue

module.exports=queue;//exporting the queue, so that it can be used wherever required