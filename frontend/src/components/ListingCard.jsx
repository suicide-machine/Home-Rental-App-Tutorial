import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { setWishList } from "../redux/slice/userSlice"

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  state,
  country,
  category,
  type,
  price,
  booking,
  startDate,
  endDate,
  totalPrice,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const navigate = useNavigate()

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    )
  }

  // prevIndex = 0
  // (0-1+3)%3 = 2%3= 2
  // (1-1+3)%3 = 0
  // (2-1+3)%3 = 1

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length)
  }

  // wishlist
  const user = useSelector((state) => state?.user?.user)

  const wishList = user?.wishList || []

  const isAddToWishList = wishList?.find((item) => item?._id === listingId)

  const dispatch = useDispatch()

  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await fetch(
        `http://localhost:3000/api/user/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const data = await response.json()

      dispatch(setWishList(data.wishList))
    } else {
      return
    }
  }

  return (
    <div
      className="relative cursor-pointer p-2.5 rounded-lg hover:shadow-lg w-72"
      onClick={() => {
        navigate(`/listings/${listingId}`)
      }}
    >
      <div className="w-72 overflow-hidden rounded-lg mb-2.5">
        <div
          className="flex w-full items-center transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div
              className="relative flex-none w-full h-64 flex items-center"
              key={index}
            >
              <img
                src={`http://localhost:3000/${photo?.replace("public", "")}`}
                alt=""
                className="w-full h-full brightness-90"
              />

              <div
                className="absolute top-1/2 transform -translate-y-1/2 p-1.5 rounded-full border-none cursor-pointer flex items-center justify-center bg-white/70 z-50 hover:bg-white left-2.5"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevSlide(e)
                }}
              >
                <FaArrowLeft className="font-[15px]" />
              </div>

              <div
                className="absolute top-1/2 transform -translate-y-1/2 p-1.5 rounded-full border-none cursor-pointer flex items-center justify-center bg-white/70 z-50 hover:bg-white right-2.5"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNextSlide(e)
                }}
              >
                <FaArrowRight className="font-[15px]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-700 ">
        {city}, {state}, {country}
      </h3>

      <p className="text-base text-slate-700">{category}</p>

      {!booking ? (
        <>
          <p className="text-base text-slate-700">{type}</p>

          <p className="text-base text-slate-700">
            <span className="font-bold text-lg text-slate-700">₹{price}</span>{" "}
            per night
          </p>
        </>
      ) : (
        <>
          <p className="text-base text-slate-700">
            {startDate} - {endDate}
          </p>

          <p className="text-base text-slate-700">
            <span className="font-bold text-lg text-slate-700">
              ₹{totalPrice}
            </span>{" "}
            total
          </p>
        </>
      )}

      <button
        className={`absolute right-5 top-5 border-none text-2xl cursor-pointer z-[999] bg-none ${
          isAddToWishList ? "text-red-500" : "text-white"
        }`}
        onClick={(e) => {
          e.stopPropagation()
          patchWishList()
        }}
        disabled={!user}
      >
        <FaHeart />
      </button>
    </div>
  )
}

export default ListingCard
