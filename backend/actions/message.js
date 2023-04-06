const prisma = require('../getPrisma');

const router = require('express').Router();


router.post('/like-unlike', async (req, res, next) => {
    const {
        id
    } = req.User;
    const {
        messageId
    } = req.body;

    try {
        if (!messageId) {
            res.status(404).json({
                success: false,
                message: "no message Found"
            })
        }
        const alreadyLiked = await prisma.like.findFirst({
            where: {
                AND: [{
                        userId: id
                    },
                    {
                        messageId: messageId
                    }
                ]
            }
        })
        if (alreadyLiked) {
            await prisma.like.delete({
                where: {
                    userId_messageId: {
                        messageId: messageId,
                        userId: id
                    }
                }
            })
            res.status(200).json({
                success: true,
                message: "successfully disliked"
            })
        } else {
            await prisma.like.create({
                data: {
                    message: {
                        connect: {
                            id: messageId
                        },
                    },
                    user: {
                        connect: {
                            id: id
                        }
                    }
                }
            })
            res.status(200).json({
                success: true,
                message: "successfully liked"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

})


router.post('/:id', async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        await prisma.message.delete({
            where: {
                id: id
            },
            include: {
                children: true,
                likes: true
            }
        })
        res.status(200).json({
            success: true,
            message: "message deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


module.exports = router;