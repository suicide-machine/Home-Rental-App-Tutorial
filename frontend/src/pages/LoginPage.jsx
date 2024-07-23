import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setLogin } from "../redux/slice/userSlice"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data) {
        dispatch(
          setLogin({
            user: data.rest,
            token: data.token,
          })
        )

        navigate("/")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center my-7 font-semibold">Sign In</h1>

      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="p-3 rounded-lg border"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="p-3 rounded-lg border"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-slate-700  rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80">
          Login
        </button>
      </form>

      <div className="mt-5 flex gap-2">
        <p>Don't have an account?</p>

        <Link to={"/register"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
