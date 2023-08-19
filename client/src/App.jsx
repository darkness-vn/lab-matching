import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import Auth from './auth.hoc'
import { useNavigate } from 'react-router-dom'

function App({ user }) {

  const nav = useNavigate()

  const userIdRef = useRef()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:8888/login", { id: userIdRef.current?.value })
      localStorage.setItem("user", JSON.stringify(data))
      nav("/home")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <input type="text" ref={userIdRef} />
      </form>
    </>
  )
}

export default Auth(App)
