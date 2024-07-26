import React from "react"
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import ListingCard from "../components/ListingCard"

const WishList = () => {
  const wishList = useSelector((state) => state.user.user.wishList)
  console.log(wishList)

  return (
    <>
      <Navbar />

      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12">
        Your Wish List
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {wishList?.map(
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

export default WishList
