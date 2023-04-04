const express = require('express');
const cors = require('cors');
const prisma = require('./getPrisma')
const auth = require('./actions/auth');
const channel = require('./actions/channel');
const { protect } = require('./actions/middleware/auth.protect');

prisma.$connect().then(()=>console.log("DB connected"))
.catch(e=> console.log(`error here: ${e}`))


const app = express();

app.use(express.json());
app.use(cors());

app.get('/delete', async (req, res, next) =>{
    const del = await prisma.user.deleteMany();
    res.status(200).json({
        success: true,
        ...del
    })
});

// auth

app.use('/auth', auth)


// protection

app.use(protect);


app.get('/users', async (req, res, next)=>{
    try {
        const {id} = req.User;
        const users = await prisma.user.findMany({
            where: {
                AND: [
                    {
                        role: 'USER'
                    },
                    {
                        NOT: {
                            id: id 
                        }
                    }

                ]
            },
            select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
                role: true
            }
        })
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
})

app.get('/get-user', async (req, res, next)=>{
    try {
        const {id} = req.User;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            username: true,
            role: true
        }
    })

    res.status(200).json({
        success: true,
        user
    })
        
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })        
    }
})

// actions

app.use('/channel', channel)


app.listen(1500, ()=> {
    console.log("server started on port 1500");
})
