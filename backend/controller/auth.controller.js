import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

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
      return res.status(409).json({ message: "User already exist." })
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
    console.log(error)
  }
}
