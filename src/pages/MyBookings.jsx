import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets.js'
import BlurCircle from '../components/BlurCircle.jsx'
import timeFormat from '../lib/timeFormat.js'
import isoTimeFormat from '../lib/isoTimeFormat.js'
import { dateFormat } from '../lib/dateFormat.js'

const MyBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getMyBookings()
  }, [])

  return !isLoading ? (
    <div className={'relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'}>
      <BlurCircle top={'100px'} left={'100px'}/>
      <div>
        <BlurCircle bottom={'0px'} left={'600px'}/>
      </div>
      <h1 className={'text-lg font-semibold mb-4'}>My Bookings</h1>
      {bookings.map((item, index) => (
        <div key={index}
             className={'flex flex-col md:flex-row  justify-between bg-primary/8 border rounded-lg mt-4 p-2 max-w-3xl border-primary/20'}>
          <div className={'flex flex-col md:flex-row'}>
            <img src={item.show.movie.poster_path} alt={'movie'}
                 className={'md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'}/>
            <div className={'flex flex-col p-4'}>
              <p className={'text-lg font-semibold'}>{item.show.movie.title}</p>
              <p className={'text-gray-400 text-sm'}>{timeFormat(item.show.movie.runtime)}</p>
              <p className={'text-gray-400 text-sm mt-auto'}>{dateFormat(item.show.showDateTime)}</p>
            </div>
          </div>
          <div className={'flex flex-col md:items-end md:text-right p-4 justify-between'}>
            <div className={'flex items-center gap-4'}>
            <p className={'text-2xl font-semibold mb-3'}>{currency}{item.amount}</p>
              {!item.isPaid && <button className={'px-4 py-1.5 mb-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'}>Pay Now</button>}
            </div>
            <div className={'text-sm'}>
              <p><span>Total Tickets:</span> {item.bookedSeats.length}</p>
              <p><span>Seat Number:</span> {item.bookedSeats.join(", ")}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>

    </div>
  )
}

export default MyBookings