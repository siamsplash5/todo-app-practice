// dependencies
const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { username, id } = decoded;
        req.username = username;
        req.id = id;
        next();
    } catch (error) {
        next('Authentication faileds');
    }
};

module.exports = checkLogin;
