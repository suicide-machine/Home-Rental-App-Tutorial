import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.js"

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body

    const profileImage = req.file

    if (!profileImage) {
      return res.status(400).send("No file uploaded")
    }

    const profileImagePath = profileImage.path

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return next(errorHandler(409, "User already exist!"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    })

    await newUser.save()

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const validUser = await User.findOne({ email })

    if (!validUser) {
      return next(errorHandler(404, "User not  found!"))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password)

    if (!validPassword) {
      return next(errorHandler(400, "Wrong Credentials"))
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

    const { password: pass, ...rest } = validUser._doc

    res.status(200).json({ token, rest })
  } catch (error) {
    next(error)
  }
}
