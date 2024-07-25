import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

// to make input as json
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

import authRoutes from "./routes/auth.route.js"
import listingRoutes from "./routes/listing.route.js"
import bookingRoutes from "./routes/booking.route.js"
import userRoutes from "./routes/user.route.js"

app.use("/api/auth", authRoutes)
app.use("/api/listing", listingRoutes)
app.use("/api/booking", bookingRoutes)
app.use("/api/user", userRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
