import React, { useEffect } from "react"
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { setPropertyList } from "../redux/slice/userSlice"
import ListingCard from "../components/ListingCard"

const PropertyList = () => {
  const user = useSelector((state) => state.user.user)

  const propertyList = user?.propertyList

  //   console.log(propertyList)

  const dispatch = useDispatch()

  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${user._id}/properties`,
        {
          method: "GET",
        }
      )

      const data = await response.json()

      //   console.log(data)
      dispatch(setPropertyList(data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPropertyList()
  }, [])

  return (
    <>
      <Navbar />

      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12">
        Your Property List
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {propertyList?.map(
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

export default PropertyList
