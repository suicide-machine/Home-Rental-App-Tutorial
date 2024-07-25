import express from "express"
import {
  addListingToWishList,
  getTripList,
} from "../controller/user.controller.js"

const router = express.Router()

router.get("/:userId/trips", getTripList)

router.patch("/:userId/:listingId", addListingToWishList)

export default router
