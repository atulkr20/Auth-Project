const mongoose = require("mongoose");

const postsModel = mongoose.schema ({
    title: {
        type:String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },


},
{
    timestamps: true
});

module.exports = mongoose.model ('Post', postsModel);