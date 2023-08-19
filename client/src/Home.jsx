import Auth from "./auth.hoc";
import { useEffect, useState } from "react";
import socket from "./socket"
import { v4 as uuidv4 } from "uuid"
import { useNavigate } from 'react-router-dom'

function Home({ user }) {

    const [isMatching, setIsMatching] = useState(false)
    const nav = useNavigate()

    useEffect(() => {

        socket.on("matching", data => {
            setIsMatching(false)
            console.log(data)
        })

        socket.on("complete_matching", data => {
            console.log(`complete_matching`, data)
            socket.emit("joining", data.room)
            setIsMatching(false)
            nav(`/room/${data.room}`)
        })
    }, [socket])

    const startMatching = () => {
        setIsMatching(true)
        socket.emit("matching", user)
    }

    return <div style={{ position: "relative" }}>

        <button onClick={startMatching}>Start matching...</button>

        {isMatching && <div className="matching-container">
            <p>... In queue ...</p>
        </div>}

    </div>
}

export default Auth(Home)