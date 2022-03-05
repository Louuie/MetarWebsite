const admin = require('../../firebase');

const auth = admin.auth();
let unauthorizedUser = {
  error: { status: 401, message: "Unauthorized: Please Login to access the contents of this page!" }
}

const isValid = (req, res, next) => {
  let checkRevoked = true;
  if(req.headers.authorization == undefined || req.headers.authorization == null) res.status(401).json(unauthorizedUser); else {
    const token = req.headers.authorization.split(' ')[1];
    auth.verifyIdToken(token, checkRevoked).then((payload) => {
      req.fullName = payload.name;
      req.email = payload.email;
      req.picture = payload.picture;
      req.user_id = payload.user_id;
      return next();
    }).catch((err) => { 
      if(err.code === 'auth/id-token-revoked') {
        console.log("Token has been revoked, please reauthenticate!");
        res.json(unauthorizedUser);
      } else { console.log("Token is invalid!"); res.json(unauthorizedUser) }
     })
  }
}; 









module.exports = { isValid };