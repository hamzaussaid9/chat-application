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

// actions

app.use('/channel', channel)


app.listen(1500, ()=> {
    console.log("server started on port 1500");
})
