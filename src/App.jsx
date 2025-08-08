import React from 'react'
import NavBar from './components/NavBar.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home  from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Favorite from './pages/Favorite.jsx'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer.jsx'
import MoviesDetails from './pages/MoviesDetails.jsx'
import SeatLayout from './pages/SeatLayout.jsx'
import  Layout  from './pages/admin/Layout.jsx'
import DashBoard from './pages/admin/DashBoard.jsx'
import AddShow from './pages/admin/AddShow.jsx'
import ListShows from './pages/admin/ListShows.jsx'
import ListBookings from './pages/admin/ListBookings.jsx'

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <>
      <Toaster/>
      { !isAdminRoute && <NavBar/>}
      <Routes>
        <Route  path={'/'} element = {<Home/>}/>
        <Route  path={'/movies'} element = {<Movies/>}/>
        <Route  path={'/movies/:id'} element = {<MoviesDetails/>}/>
        <Route  path={'/movies/:id/:date'} element = {<SeatLayout/>}/>
        <Route  path={'/my-bookings'} element = {<MyBookings/>}/>
        <Route  path={'/favorite'} element = {<Favorite/>}/>
        <Route path={'/admin/*'} element={<Layout/>}>
          <Route index element={<DashBoard/>}/>
          <Route path={'add-shows'} element={<AddShow/>}/>
          <Route path={'list-shows'} element={<ListShows/>}/>
          <Route path={'list-bookings'} element={<ListBookings/>}/>
        </Route>
      </Routes>
      { !isAdminRoute && <Footer/>}
    </>
  )
}

export default App
