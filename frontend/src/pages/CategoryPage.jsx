import React, { useEffect } from "react"
import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setListings } from "../redux/slice/listingSlice"
import ListingCard from "../components/ListingCard"

const CategoryPage = () => {
  const { category } = useParams()

  const listings = useSelector((state) => state.listings.listings)

  //   console.log(listings)

  const dispatch = useDispatch()

  const getListingsByCategory = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/listing?category=${category}`,
        {
          method: "GET",
        }
      )

      const data = await res.json()

      dispatch(setListings({ listings: data }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getListingsByCategory()
  }, [category])

  return (
    <>
      <Navbar />

      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12 uppercase">
        {category} Listings
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {listings?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            state,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              state={state}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
    </>
  )
}

export default CategoryPage
