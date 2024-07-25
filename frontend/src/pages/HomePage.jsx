import React from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Categories from "../components/Categories"
import Listings from "../components/Listings"

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <Listings />
    </div>
  )
}

export default HomePage
