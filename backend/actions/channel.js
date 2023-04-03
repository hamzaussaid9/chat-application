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
            channels
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
                id: id
            },
            select: {
                id: true,
                title: true,
                users: true,
                created_by: true,
                messages: true,
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
        if(!title){
            res.status(404).json({
                success: false,
                message: "Channel title is required"
            })
        }
        if(!users || users.length < 1){
            users = [id];
        }
        else{
            users.push(id);
        }
        await prisma.channel.create({
            data: {
                title: req.body.title,
                created_by: {
                    connect: id
                },
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
        
    } catch (error) {
    res.status(500).json({
         success: false,
         message: error.message
     })
    } 
})


module.exports = router;