const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      console.log(token);
      res.status(403).json({ message: 'Not authorized' });
    }

    const decoderToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoderToken;

    next();
  } catch (error) {
    // console.log(error);
    res.status(403).json({ message: 'Not authorized' });
  }
};

module.exports = authMiddleware;
