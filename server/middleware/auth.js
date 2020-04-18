const { User } = require("../models/user");

let auth = (req, res, next) => {
  console.log(req.cookies)
  if (req.cookies.x_auth) {

    let token = req.cookies.x_auth;
    User.findByToken(token, (err, user) => {
      if (err) throw err;
      if (!user)
        return res.json({
          authSuccess: false,
        });

      req.user = user;
      next();
    });
  }
};

module.exports = { auth };
