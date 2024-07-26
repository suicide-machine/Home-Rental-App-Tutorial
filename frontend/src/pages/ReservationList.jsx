import React, { useEffect } from "react"
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { setReservationList } from "../redux/slice/userSlice"
import ListingCard from "../components/ListingCard"

const ReservationList = () => {
  const user = useSelector((state) => state.user.user)

  const reservationList = useSelector(
    (state) => state.user.user.reservationList
  )

  //   console.log(reservationList)

  const dispatch = useDispatch()

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${user._id}/reservations`,
        { method: "GET" }
      )

      const data = await response.json()

      dispatch(setReservationList(data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getReservationList()
  }, [])

  return (
    <>
      <Navbar />

      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12">
        Your Reservation List
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {reservationList?.map(
          ({
            listingId,
            hostId,
            startDate,
            endDate,
            totalPrice,
            booking = true,
          }) => (
            <ListingCard
              listingId={listingId._id}
              creator={hostId._id}
              listingPhotoPaths={listingId.listingPhotoPaths}
              city={listingId.city}
              state={listingId.state}
              country={listingId.country}
              category={listingId.category}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
            />
          )
        )}
      </div>
    </>
  )
}

export default ReservationList
