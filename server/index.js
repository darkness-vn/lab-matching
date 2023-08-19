import express from "express"
import { Server } from "socket.io"
import cors from "cors"
import bodyParser from "body-parser"
import http from "http"
import { queue, users } from "./data.js"
import { v4 as uuidv4 } from "uuid"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
})

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    console.log(`GET: /`)
    res.send("Hello world")
})

app.post("/login", (req, res) => {
    const user = users.find(item => item._id == req.body.id)
    res.status(200).json(user)
})

io.on("connection", socket => {
    console.log(`some one have connected as ${socket.id}`)

    socket.on("ping", data => {
        console.log(`event: ping ||`, data)
        socket.emit("ping", { msg: "ping response" })
    })

    socket.on("matching", data => {

        // check xem user da ton tai trong queue hay chua
        const isExistedInQueue = queue.find(user => user._id === data._id)
        if (isExistedInQueue) {
            socket.emit("matching", {
                msg: "this user is existed in queue",
                user: data
            })
        } else {
            queue.push(data)
            // tim nhung user co cung gpa trong queue

            let matchers = queue.filter(user => {
                return user.gpa === data.gpa
            })

            console.log(matchers)

            if (matchers.length === 3) {

                // Xoa matchers khoi queue
                
                setTimeout(() => {
                    io.emit("complete_matching", {
                        msg: "complete",
                        matchers,
                        room: uuidv4()
                    })
                }, 3000)
            }
        }
    })

    socket.on("joining", (data) => {
        socket.join(data)
        io.to(data).emit("greeting", "welcome to join room", data)
    })

    socket.on("disconnect", () => {
        console.log(`some one have disconnected`)
    })
})

server.listen(8888, () => {
    console.log(`server is running on port 8888`)
})