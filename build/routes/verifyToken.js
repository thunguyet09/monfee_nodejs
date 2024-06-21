const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'nguyet');
    if (decoded) {
      next();
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};
module.exports = verifyToken;