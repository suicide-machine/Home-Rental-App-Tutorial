import express from "express"
import {
  addListingToWishList,
  getPropertyList,
  getTripList,
} from "../controller/user.controller.js"

const router = express.Router()

router.get("/:userId/trips", getTripList)

router.patch("/:userId/:listingId", addListingToWishList)

router.get("/:userId/properties", getPropertyList)

export default router
