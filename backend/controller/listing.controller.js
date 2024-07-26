import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"

export const createListing = async (req, res, next) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      state,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      price,
    } = req.body

    const listingPhotos = req.files

    if (!listingPhotos) {
      next(errorHandler(400, "No file uploaded"))
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path)

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      state,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      price,
    })

    await newListing.save()

    res.status(201).json(newListing)
  } catch (error) {
    next(error)
  }
}

export const getListings = async (req, res, next) => {
  const qCategory = req.query.category

  try {
    let listings

    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator")
    } else {
      listings = await Listing.find().populate("creator")
    }

    res.status(200).json(listings)
  } catch (error) {
    next(error)
  }
}

export const getListingDetails = async (req, res, next) => {
  try {
    const { listingId } = req.params

    const listing = await Listing.findById(listingId).populate("creator")

    res.status(200).json(listing)
  } catch (error) {
    next(error)
  }
}

export const getListingsBySearch = async (req, res, next) => {
  const { search } = req.params

  try {
    let listings = []

    if (search === "all") {
      listings = await Listing.find().populate("creator")
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator")
    }

    res.status(200).json(listings)
  } catch (error) {
    next(error)
  }
}
