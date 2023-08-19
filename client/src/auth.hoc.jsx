import { useState } from "react"

export default function Auth (Component) {
    
    return () => {

        const user = JSON.parse(localStorage.getItem("user"))

        return <Component user={user}/>
    }
}