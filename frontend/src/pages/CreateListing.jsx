import React, { useState } from "react"
import Navbar from "../components/Navbar"
import { categories, facilities, types } from "../data"
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { IoIosImages } from "react-icons/io"
import { BiTrash } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const CreateListing = () => {
  const [category, setCategory] = useState("")
  const [type, setType] = useState("")

  const [guestCount, setGuestCount] = useState(1)
  const [bedroomCount, setBedroomCount] = useState(1)
  const [bedCount, setBedCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    country: "",
  })

  //   console.log(formLocation)

  const handleChangeLocation = (e) => {
    const { name, value } = e.target

    setFormLocation({
      ...formLocation,
      [name]: value,
    })
  }

  const [amenities, setAminities] = useState([])

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAminities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      )
    } else {
      setAminities((prev) => [...prev, facility])
    }
  }

  const [photos, setPhotos] = useState([])

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
  }

  const handleDragPhoto = (result) => {
    if (!result.destination) return

    const items = Array.from(photos)

    const [reorderedItem] = items.splice(result.source.index, 1)

    items.splice(result.destination.index, 0, reorderedItem)

    setPhotos(items)
  }

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    )
  }

  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    price: 0,
  })

  const handleChangeDescription = (e) => {
    const { name, value } = e.target

    setFormDescription({
      ...formDescription,
      [name]: value,
    })
  }

  const creatorId = useSelector((state) => state?.user?.user?._id)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const listingForm = new FormData()

      listingForm.append("creator", creatorId)
      listingForm.append("category", category)
      listingForm.append("type", type)
      listingForm.append("streetAddress", formLocation.streetAddress)
      listingForm.append("aptSuite", formLocation.aptSuite)
      listingForm.append("city", formLocation.city)
      listingForm.append("state", formLocation.state)
      listingForm.append("country", formLocation.country)
      listingForm.append("guestCount", guestCount)
      listingForm.append("bedroomCount", bedroomCount)
      listingForm.append("bedCount", bedCount)
      listingForm.append("bathroomCount", bathroomCount)
      listingForm.append("amenities", amenities)
      listingForm.append("title", formDescription.title)
      listingForm.append("description", formDescription.description)
      listingForm.append("price", formDescription.price)

      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo)
      })

      const res = await fetch("http://localhost:3000/api/listing/create", {
        method: "POST",
        body: listingForm,
      })

      if (res.ok) {
        console.log("Data created successfully")
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-300 py-10 px-[20px] lg:px-[40px] pb-30">
        <h1 className="text-slate-700 text-2xl sm:text-3xl font-bold">
          Create Your Listings
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="bg-white p-8 rounded-xl mt-10">
            <h2 className="text-slate-700 text-xl font-bold">
              Step 1: Title of the place
            </h2>

            <hr className="my-4 border-gray-300" />

            <h3 className="text-slate-700 text-lg mt-10 mb-5">
              Select the category.
            </h3>

            <div className="flex flex-wrap justify-center items-center gap-5 px-5 md:px-0">
              {categories?.map((item, index) => (
                <div
                  className={`flex flex-col justify-center items-center w-28 h-20 border border-gray-300 rounded-lg cursor-pointer ${
                    category === item.label ? "border-red-500 bg-gray-200" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="text-black text-2xl">{item.icon}</div>

                  <p className="font-semibold text-black">{item.label}</p>
                </div>
              ))}
            </div>

            <h3 className="text-slate-700 text-lg mt-10 mb-5">
              What type of place will offer?
            </h3>

            <div className="flex flex-col gap-5">
              {types?.map((item, index) => (
                <div
                  className={`flex justify-between gap-5 items-center max-w-2xl p-4 border border-gray-300 rounded-lg cursor-pointer ${
                    type === item.name ? "border-red-500 " : ""
                  }`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="max-w-lg">
                    <h4 className="mb-1 text-lg">{item.name}</h4>

                    <p>{item.description}</p>
                  </div>

                  <div className="text-2xl">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3 className="text-slate-700 text-lg mt-10 mb-5">
              Where is your place located?
            </h3>

            <div className="max-w-3xl">
              <div className="mb-5">
                <p className="font-bold mb-2">Street</p>

                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  required
                  className="border border-gray-300 p-4 rounded-lg w-full text-lg font-semibold focus:outline-none"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                />
              </div>
            </div>

            <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="mb-5">
                <p className="font-bold mb-2">Appartment</p>

                <input
                  type="text"
                  placeholder="Apartment, Apt, Suite"
                  name="aptSuite"
                  required
                  className="border border-gray-300 p-4 rounded-lg w-full text-lg font-semibold focus:out"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                />
              </div>

              <div className="mb-5">
                <p className="font-bold mb-2">City</p>

                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  required
                  className="border border-gray-300 p-4 rounded-lg w-full text-lg font-semibold focus:out"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                />
              </div>
            </div>

            <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="mb-5">
                <p className="font-bold mb-2">State</p>

                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  required
                  className="border border-gray-300 p-4 rounded-lg w-full text-lg font-semibold focus:out"
                  value={formLocation.state}
                  onChange={handleChangeLocation}
                />
              </div>

              <div className="mb-5">
                <p className="font-bold mb-2">Country</p>

                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  required
                  className="border border-gray-300 p-4 rounded-lg w-full text-lg font-semibold focus:out"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                />
              </div>
            </div>

            <h3 className="text-slate-700 text-lg mt-10 mb-5">
              Provide some basic details about your place
            </h3>

            <div className="flex flex-wrap gap-10">
              <div className="flex items-center gap-8 p-4 border border-gray-300 rounded-lg mb-5">
                <p className="font-semibold">Guests</p>

                <div className="flex items-center gap-2 text-2xl">
                  <MdRemoveCircleOutline
                    className="text-2xl cursor-pointer hover:text-red-500"
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1)
                    }}
                  />

                  <p>{guestCount}</p>

                  <MdAddCircleOutline
                    className="text-2xl cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setGuestCount(guestCount + 1)
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-8 p-4 border border-gray-300 rounded-lg mb-5">
                <p className="font-semibold">Bedrooms</p>

                <div className="flex items-center gap-2 text-2xl">
                  <MdRemoveCircleOutline
                    className="text-2xl cursor-pointer hover:text-red-500"
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1)
                    }}
                  />

                  <p>{bedroomCount}</p>

                  <MdAddCircleOutline
                    className="text-2xl cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1)
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-8 p-4 border border-gray-300 rounded-lg mb-5">
                <p className="font-semibold">Beds</p>

                <div className="flex items-center gap-2 text-2xl">
                  <MdRemoveCircleOutline
                    className="text-2xl cursor-pointer hover:text-red-500"
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1)
                    }}
                  />

                  <p>{bedCount}</p>

                  <MdAddCircleOutline
                    className="text-2xl cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setBedCount(bedCount + 1)
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-8 p-4 border border-gray-300 rounded-lg mb-5">
                <p className="font-semibold">Bathrooms</p>

                <div className="flex items-center gap-2 text-2xl">
                  <MdRemoveCircleOutline
                    className="text-2xl cursor-pointer hover:text-red-500"
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1)
                    }}
                  />

                  <p>{bathroomCount}</p>

                  <MdAddCircleOutline
                    className="text-2xl cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl mt-10">
            <h2 className="text-slate-700 text-xl font-bold">
              Step 2: Highlight Your Property's unique Features
            </h2>

            <hr className="my-4 border-gray-300" />

            <h3 className="text-slate-700 text-lg mt-10 mb-5">
              What kind of offer you will provide
            </h3>

            <div className="flex flex-wrap gap-5">
              {facilities?.map((item, index) => (
                <div
                  className={`flex flex-col justify-center items-center w-52 h-24 border border-gray-300 rounded-lg cursor-pointer ${
                    amenities.includes(item.name)
                      ? "border-2 border-red-500 bg-gray-200"
                      : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="text-2xl">{item.icon}</div>

                  <p className="font-semibold">{item.name}</p>
                </div>
              ))}
            </div>

            <h3 className="text-slate-700 text-lg my-10">
              Add some photos of your place
            </h3>

            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="flex flex-wrap gap-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />

                        <label
                          htmlFor="image"
                          className="flex flex-col justify-center items-center cursor-pointer border border-dashed border-gray-300 py-10 px-[100px] rounded-lg"
                        >
                          <div className="text-6xl">
                            <IoIosImages />
                          </div>

                          <p className="font-semibold text-center">
                            Upload from your device
                          </p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => (
                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="relative w-64 h-36 cursor-move"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="place"
                                  className="w-full h-full object-cover"
                                />

                                <button
                                  type="button"
                                  onClick={() => handleRemovePhoto(index)}
                                  className="absolute ring-0 top-0 p-1 bg-white bg-opacity-80 text-lg cursor-pointer"
                                >
                                  <BiTrash className="text-red-700" />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}

                        <input
                          id="image"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />

                        <label
                          htmlFor="image"
                          className="flex flex-col justify-center items-center cursor-pointer border border-dashed border-gray-300 w-64 h-36"
                        >
                          <div className="text-6xl">
                            <IoIosImages />
                          </div>

                          <p className="font-semibold text-center">
                            Upload from your device
                          </p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3 className="text-slate-700 text-lg my-10">
              Provide details about your place.
            </h3>

            <div className="flex flex-col">
              <p className="font-bold my-4">Title</p>

              <input
                type="text"
                placeholder="Title"
                name="title"
                required
                className="border border-gray-300 p-4 rounded-lg font-semibold w-full sm:w-96"
                value={formDescription.title}
                onChange={handleChangeDescription}
              />

              <p className="font-bold my-4">Description</p>

              <textarea
                type="text"
                rows={5}
                placeholder="Title"
                name="description"
                required
                className="border border-gray-300 p-4 rounded-lg font-semibold w-full sm:w-96"
                value={formDescription.description}
                onChange={handleChangeDescription}
              />

              <p className="font-bold my-4">Price</p>

              <div className="flex items-center">
                <span className="text-xl font-bold mr-4">Rs.</span>

                <input
                  type="number"
                  placeholder="100"
                  name="price"
                  required
                  className="border border-gray-300 p-4 rounded-lg font-semibold w-40"
                  value={formDescription.price}
                  onChange={handleChangeDescription}
                />
              </div>
            </div>
          </div>

          <button className="mt-10 bg-blue-800 text-white py-2 px-6 rounded-lg hover:shadow-2xl uppercase">
            Create Your Listing
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateListing
