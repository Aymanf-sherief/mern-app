const { User } = require("../models/user");

let auth = (req, res, next) => {
  console.log(`Got cookies: ${JSON.stringify(req.cookies)}`);
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
  } else {
    return res.json({
      authSuccess: false,
    });
  }
};

module.exports = { auth };
