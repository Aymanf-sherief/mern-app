const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user_id: {
        type: String,
       
    },
    body: {
        type: String,
        trim: true,
       
    },
    datetime: {
        type: Date,
        
    },
    user     : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }


})



const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
