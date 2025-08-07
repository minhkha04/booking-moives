import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()

  return (
    <div
      className={'fixed top-0 left-0 z-50 w-full h-16 flex items-center justify-between px-6 md:px-16 lg:px-46 py-5'}>
      <Link to={'/'} className={'max-md:fixed-1'}>
        <img src={assets.logo} alt={'logo'} className={'w-36 h-auto'}/>
      </Link>
      <div
        className={` max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg max-md:justify-center max-md:h-screen z-50 flex flex-col md:flex-row items-center gap-8 py-3 md:px-8 md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 cursor-pointer ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
        <XIcon
          className={'md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer'} onClick={() => setIsOpen(!isOpen)}/>
        <Link onClick={() => {scrollTo(0, 0), setIsOpen(false)}} to={'/'}>Home</Link>
        <Link onClick={() => {scrollTo(0, 0), setIsOpen(false)}} to={'/movies'}>Movies</Link>
        <Link onClick={() => {scrollTo(0, 0), setIsOpen(false)}} to={'/'}>Theaters</Link>
        <Link onClick={() => {scrollTo(0, 0), setIsOpen(false)}} to={'/'}>Releases</Link>
        <Link onClick={() => {scrollTo(0, 0), setIsOpen(false)}} to={'/favorite'}>Favorite</Link>
      </div>
      <div className={'flex items-center gap-8'}>
        <SearchIcon className={'max-md:hidden w-6 h-6 cursor-pointer'}/>
        {
          !user ? (
            <button
              className={'px sm:px-4 py-1-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'}
              onClick={openSignIn}>Login
            </button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>}
                                   onClick={() => navigate('/my-bookings')}/>
              </UserButton.MenuItems>
            </UserButton>
          )
        }

        <MenuIcon className={'max-md:ml-4 md:hidden w-8 h-8 cursor-pointer'} onClick={() => setIsOpen(!isOpen)}/>
      </div>

    </div>
  )
}

export default NavBar