import React, { useState } from "react"
import uploadProfilePic from "../assets/upload.png"
import { Link } from "react-router-dom"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  })

  //   console.log(formData)

  const handleChange = (e) => {
    const { name, value, files } = e.target

    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    })
  }

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center my-7 font-semibold">Sign Up</h1>

      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          className="p-3 rounded-lg border"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          className="p-3 rounded-lg border"
          required
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          className="p-3 rounded-lg border"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="p-3 rounded-lg border"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="p-3 rounded-lg border"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <input
          id="image"
          type="file"
          name="profileImage"
          accept="image/*"
          className="hidden"
          required
          onChange={handleChange}
        />

        <label htmlFor="image" className="flex items-center gap-3 mt-2 mb-2">
          {formData.profileImage ? (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          ) : (
            <img
              src={uploadProfilePic}
              alt="add profile photo"
              className="w-8 h-8"
            />
          )}

          <p className="text-lg text-slate-700">Upload Your Photo</p>
        </label>

        <button className="bg-slate-700  rounded-lg p-3 text-white uppercase hover:opacity-95">
          Register
        </button>
      </form>

      <div className="mt-5 flex gap-2">
        <p>Already have an account?</p>

        <Link to={"/login"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default RegisterPage
