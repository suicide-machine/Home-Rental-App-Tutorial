import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import { facilities } from "../data"

import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRange } from "react-date-range"
import { useSelector } from "react-redux"

const ListingDetails = () => {
  const { listingId } = useParams()
  const [listing, setListing] = useState(null)

  console.log(listing)

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/listing/${listingId}`,
        {
          method: "GET",
        }
      )

      const data = await response.json()

      setListing(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getListingDetails()
  }, [])

  // Calender
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection])
  }

  const start = new Date(dateRange[0].startDate)
  const end = new Date(dateRange[0].endDate)

  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24)

  //  Booking
  const customerId = useSelector((state) => state?.user?.user?._id)

  // console.log(customerId)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      }

      const response = await fetch("http://localhost:3000/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      })

      if (response.ok) {
        navigate(`/${customerId}/trips`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />

      <div className="px-5 py-10 lg:px-12">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-4">
          <h1 className="text-2xl font-bold text-slate-700">
            {listing?.title}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2.5 my-5">
          {listing?.listingPhotoPaths?.map((item, index) => (
            <img
              src={`http://localhost:3000/${item.replace("public", "")}`}
              alt="listing photo"
              className="max-h-[280px] max-w-[280px] object-cover"
              key={index}
            />
          ))}
        </div>

        <h2 className="text-xl font-bold text-slate-700">
          {listing?.type} in {listing?.city}, {listing?.state},{" "}
          {listing?.country}
        </h2>

        <p className="max-w-[800px] mt-5 text-slate-700">
          {listing?.guestCount} guests - {listing?.bedroomCount} bedroom(s) -{" "}
          {listing?.bedCount} bed(s) - {listing?.bathroomCount} bathrooms(s)
        </p>

        <hr className="my-4 border-gray-300" />

        <div className="flex gap-5 items-center">
          <img
            src={`http://localhost:3000/${listing?.creator?.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt=""
            className="w-[60px] h-[60px] m-0"
          />

          <h3 className="text-slate-700 font-semibold">
            Owned by {listing?.creator?.firstName} {listing?.creator?.lastName}
          </h3>
        </div>

        <hr className="my-4 border-gray-300" />

        <h3 className="text-xl font-bold text-slate-700">Description</h3>

        <p className="max-w-[800px] mt-5 text-slate-700">
          {listing?.description}
        </p>

        <hr className="my-4 border-gray-300" />

        <div className="flex flex-col lg:flex-row justify-between lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-700">
              What kind of offers will provide
            </h2>

            <div className="grid grid-cols-2 gap-x-5 sm:gap-x-24 my-7 max-w-[700px]">
              {listing?.amenities[0]?.split(",").map((item, index) => (
                <div
                  className="flex items-center gap-5 text-lg font-semibold mb-5"
                  key={index}
                >
                  <div className="text-2xl text-slate-700">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>

                  <p className="m-0 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-700">
              How long do you want to stay?
            </h2>

            <div className="my-7">
              <DateRange ranges={dateRange} onChange={handleSelect} />

              {dayCount > 1 ? (
                <h2 className="mb-2.5">
                  ₹{listing?.price} x {dayCount} nights
                </h2>
              ) : (
                <h2 className="mb-2.5">
                  ₹{listing?.price} x {dayCount} night
                </h2>
              )}

              <h2 className=" font-bold text-slate-700 mb-2.5">
                Total price: ₹{listing?.price * dayCount}
              </h2>

              <p className="text-slate-700">
                Start Date: {dateRange[0].startDate.toDateString()}
              </p>

              <p className="text-slate-700">
                End Date: {dateRange[0].endDate.toDateString()}
              </p>

              <button
                className="w-full mt-7 sm:max-w-[300px] text-white bg-slate-700 p-2 rounded-lg hover:opacity-95 uppercase"
                type="submit"
                onClick={handleSubmit}
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingDetails
