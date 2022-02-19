const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader || authHeader.split(' ')[1];
    if (!token) res.status(401).json({
        message: "Acesso negado!"
    });
    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);
        next()
    } catch (e) {
        res.status(400).json({
            message: 'Token Invalido'
        })
    }
};