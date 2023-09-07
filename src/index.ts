import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { Error } from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './route/authRoute'
import userRoute from './route/userRoute'
import productRoute from './route/product'
import chatRoute from './route/conversationRoute'
import messageRoute from './route/messasgeRoute'
import { Server } from 'socket.io'
import http from "http";
import { getAllUsers } from 'controller/userController'
import requestRoute from './route/requestRoute'
import cookieParser from "cookie-parser"


interface Message {
    serderId: string;
    receipientId: string;
    message: string;
}

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: ["http://localhost:5000", "http://localhost:8100"] }))
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5000", "http://localhost:8100"],
    }
});

httpServer.listen(PORT, () => console.log('app listening on port', PORT))
app.use((req: Request, res: Response, next: NextFunction) => {
    next()
})

let onlineUsers: any[] = []

io.on('connection', (socket) => {
    // on connection
    console.log(`this id connected ${socket.id}`)
    io.emit('connection', socket.id)
    socket.on('addUser', (userId) => {
        console.log('user to push ', userId, socket.id)
        !onlineUsers.some((user: any) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
     
        io.emit('onlineUsers', onlineUsers)
        console.log('onlineUsers after add', onlineUsers)
    })


    socket.on('disconnect', () => {
        console.log(`This user left ${socket.id}`)
        const res = onlineUsers.filter((user: any) => user.socketId !== socket.id)
        console.log(` online users`, res)
        io.emit('removeUser', res)

    })



})






















let onlineUser: any[] = []

// io.on("connection", (socket) => {
//     socket.emit('connection', 'socket Connected  ' + socket.id)
//     console.log('this user connected', socket.id)

//     // Add user to online
//     socket.on("addUser", (userId: any) => {
//         !onlineUser.some((user: any) => user.userId === userId) &&
//             onlineUser.push({
//                 userId,
//                 socketId: socket.id
//             }) 
//         console.log("online users", onlineUser)
//         io.emit("getUser", onlineUser)
//     })


//     // Send messages to a specific user
//     socket.on("sendMessage", (data: Message) => {
//         console.log(data)
//         const friendsId = onlineUser.find((user) => user.userId === data.receipientId)
//         if (friendsId) {
//             io.to(friendsId.socketId).emit("getMessage", data) 
//             console.log("friend", friendsId)
//         } else {
//             console.log("friend not found") 

//         }
//     })








//     socket.on('disconnect', (user: string) => {
//         // letuser = onlineUser.filter((user)=>user.)

//         console.log('user left')
//         const res = onlineUser.filter((user) => user.socketId !== socket.id)
//         io.emit("getUser", res)
//         console.log('online user', res)


//     })
// });

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log('mongoose connected'))
    .catch((err: Error) => console.error(err))


// Authentication 
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/product', productRoute)
app.use('/api/chat', chatRoute)
app.use('/api/message', messageRoute)
app.use('/api/request', requestRoute) 