const jwt = require('jsonwebtoken');
const prisma = require('../../getPrisma');

exports.protect = async (req, res, next) => {

    try {

        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            res.status(401).json({
                success: false,
                message: "not authorized"
            });
        }
        const decoded = jwt.verify(token, "ikkjkljkljkljkljkljlkjl");

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true,
                role: true
            }
        })
        req.User = user;
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}