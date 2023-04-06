const prisma = require('../getPrisma');

const router = require('express').Router();

// get channels

router.get('/', async (req, res, next) => {
   try {
    
    const {role, id} = req.User;
        if(role === 'ADMIN'){
            const channels = await prisma.channel.findMany({
                select: {
                    id: true,
                    title: true,
                    created_by: true,
                    users: true,
                }
            })
            res.status(200).json({
                success: true,
                channels
            })
        }
        const channels = await prisma.user.findUnique({
          where: {
            id: id
          },
          select: {
            channels: {
                select: {
                    id: true,
                    created_by: true,
                    title: true,
                    users: true
                }
            }
          }
        })
        res.status(200).json({
            success: true,
            channels: channels.channels
        })
   } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   } 
})

// get specific channel information

router.get('/:id', async (req, res, next) =>{

    try {
        const {id} = req.params;
        const channel = await prisma.channel.findUniqueOrThrow({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                title: true,
                users: true,
                created_by: true,
                messages: {
                    include: {
                        likes: true,
                        children: {
                            include: {
                                user: true,
                                likes: true,
                                children: {
                                    include: {
                                        user: true,
                                        likes: true,
                                    }       
                                }
                            }
                        },
                        user: true,                        
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                },
                ownerId: true
            }
        })
        res.status(200).json({
            success: true,
            channel
        })
    } catch (error) {
    res.status(500).json({
         success: false,
         message: error.message
     })
    }
})

// create a channel

router.post('/', async (req, res, next) => {
    try {
        const {id} = req.User;
        const {title, users} = req.body;
        if(!title || !users){
            res.status(404).json({
                success: false,
                message: "Channel details are required"
            })
        }
        // if(!users || users.length < 1){
        //     users = [id];
        // }
        // else{
        //     users.push(id);
        // }
        await prisma.channel.create({
            data: {
                title: req.body.title,
                ownerId: id,
                users: {
                    connect: users.map((userId)=> ({id: userId}))
                }
            }
        })
        res.json(200).json({
            success: true,
            message: "Channel has been created"
        })
    } catch (error) {
    res.status(500).json({
         success: false,
         message: error.message
     })
    } 
})

// post a message

router.post('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = req.User;
        const {message, parentId} = req.body;
        if(parentId){
            const msg = await prisma.message.create({
                data: {
                    message: message,
                    Parent: {
                        connect: {
                            id: parentId
                        }
                    },
                    channel: {
                        connect: {
                            id: parseInt(id)
                        }
                    },
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            });
            if(msg.id){
                res.status(200).json({
                    success: true,
                    message: "message sent"
                })
            }
        }
        else{ 
        const msg = await prisma.message.create({
            data: {
                message: message,
                channel: {
                    connect: {
                        id: parseInt(id)
                    }
                },
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        });
        if(msg.id){
            res.status(200).json({
                success: true,
                message: "message sent"
            })
        }
    }
        res.status(400).json({
            success: false,
            message: "message not sent"
        })
        
    } catch (error) {
    res.status(500).json({
         success: false,
         message: error.message
     })
    } 
})


router.delete('/:id', async (req, res, next) => {
    try {
        const { role} = req.User;
        const {id} = req.params;
        if(role !== "ADMIN"){
            res.status(401).json({
                success: false,
                message: "unauthorize for this action"
            })
        }
        const del = await prisma.channel.delete({
            where: {
                id: parseInt(id)
            },
            include: {
                messages: {
                    include: {
                        children: true,
                        likes: true,
                    }
                }
            }
        })
       res.send(200).json({
        success: true,
        message: "chanenl deleted"
       }) 
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
})

module.exports = router;