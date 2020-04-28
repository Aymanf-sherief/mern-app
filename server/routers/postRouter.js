const express = require("express");
const router = express.Router();

const { Post } = require("../models/post");
const { auth } = require("../middleware/auth");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { json } = require("body-parser");

router.use((req, res, next) => {
  console.log(`${req.method}: ${req.url} WITH ${JSON.stringify(req.body)}`);
  next();
});
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

router.post("/api/posts/create", auth, (req, res) => {
  const post = new Post(req.body);

  post["user"] = req.user._id;
  post.save((err, savedPost) => {
    if (err) return res.status(401).json({ success: false, error: err });
    savedPost['user'] = req.user;
    return res.status(200).json({ success: true, postData: savedPost });
  });
});

router.get("/api/posts/list", auth, (req, res) => {
  const posts = Post.find({ user: req.user._id })
    .populate("user")
    .exec((err, posts) => {
      if (err) return res.status(401).json({ success: false, error: err });
      return res.status(200).json({ success: true, posts: posts });
    });
});

module.exports = router;
