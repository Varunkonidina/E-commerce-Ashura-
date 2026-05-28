import React from 'react'
import Header from '../Components/Header'
import Slide from'../Components/Slide'
import Trending from '../Components/Trending'
import Latest from '../Components/Latest'
import Brands from '../Components/Brands'
import Footer from '../Components/Footer'
import AddProduct from '../Components/AddProduct'
const Home = () => {
  return (
    <div>
      <Header/>
      <Slide/>
      <Trending/>
      <Brands/>
      <Latest/>
      <Footer/>
      {/* <AddProduct/> */}
    </div>
  )
}

export default Home
