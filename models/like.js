const mongoose=require("mongoose");//requiring mongoose and its existing instance will be used

// defining the like schema consisting of user, likeable and on model fields

const likeSchema=new mongoose.Schema({

    // user field is of type object id, is necessary and is the id of a user

    user: {

        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"

    },

    // likeable field is of type object id, is necessary and is the id of on model(dynamic referencing using refPath)

    likeable: {

        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"

    },

    // on model defines the model of the likeable, is of type string, is necessary and can be either a post or a comment(ensured using enum)

    onModel: {

        type: "String",
        required: true,
        enum: ["Post", "Comment"]

    }

}, {

    // enabling timestamps for the schema

    timestamps: true

});

// defining the model for which the like schema has been defined, named as Like

const Like=mongoose.model("Like", likeSchema);

// exporting the model, so that it can be accessed wherever required

module.exports=Like;