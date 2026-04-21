import React from 'react'
import Banner from '../components/home/Banner'
import FeaturedDestinations from '../components/home/FeaturedDestinations'
import Advertisement from '../components/home/Advertisement'
import PopularTrips from '../components/home/PopularTrips'
import Hotels from '../components/home/Hotels'

const HomePage = () => {
  return (
    <>
      <Banner />
      <FeaturedDestinations />
      <Advertisement />
      <PopularTrips />
      <Hotels />
    </>
  )
}

export default HomePage
