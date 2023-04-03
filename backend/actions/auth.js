const prisma = require('../getPrisma');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

router.route('/login').post(async (req,res,next) => {
    try {
        const info = {
            username: req.body.username,
            password: req.body.password
        }
        if(!info.username || !info.password){
            res.status(400).json({
                success: false,
                message: "please provide username and password"
            })
        }
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                username: info.username
            }
        })

        if(user.password !== info.password){
            res.status(404).json({
                success: false,
                message: "username or password is incorrect"
            })
        }

        const token = jwt.sign({id: user.id},"ikkjkljkljkljkljkljlkjl", {
            expiresIn: "30 days"
        })

        res.status(200).json({
            token,
            success: true,
            message: "Login Successful"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

})

router.route('/sign-up').post(async (req,res,next) => {
    try {
        const info = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            role: 'USER'
        }

        const user = await prisma.user.findUnique({
            where: {
                username : info.username
            }
        })

        if(user){
            res.status(400).json({
                success: false,
                message: "User already has been regsitered"
            })
        }

        await prisma.user.create({
            data: {
                first_name: info.first_name,
                last_name: info.last_name,
                username: info.username,
                password: info.password,
                role: info.role,
            }
        
        })

        res.status(200).json({
            success: true,
            message: "User has been registered"
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

})


module.exports = router;