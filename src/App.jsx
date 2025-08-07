import React from 'react'
import NavBar from './components/NavBar.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home  from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import SeatLayout from './pages/SeatLayout.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Favorite from './pages/Favorite.jsx'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer.jsx'

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <>
      <Toaster/>
      { !isAdminRoute && <NavBar/>}
      <Routes>
        <Route  path={'/'} element = {<Home/>}/>
        <Route  path={'/movies'} element = {<Movies/>}/>
        <Route  path={'/movies:id'} element = {<SeatLayout/>}/>
        <Route  path={'/my-bookings'} element = {<MyBookings/>}/>
        <Route  path={'/favorite'} element = {<Favorite/>}/>
      </Routes>
      { !isAdminRoute && <Footer/>}
    </>
  )
}

export default App
