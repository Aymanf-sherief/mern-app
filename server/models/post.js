const mongoose = require("mongoose");
const { User } = require("./user");

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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

postSchema.statics.findByName = function (username) {
  user = User.findOne({ username }, (err, user) => {
      console.log(user)
    if (err) return err;
    return this.find({ user: user._id });
  });
};

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
