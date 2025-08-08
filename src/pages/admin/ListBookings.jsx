import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets.js'
import Loading from '../../components/Loading.jsx'
import Title from '../../components/admin/Title.jsx'
import { dateFormat } from '../../lib/dateFormat.js'

const ListBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const getAllBookings = async () => {
    setBookings(dummyBookingData)
    setLoading(false)
  }
  console.log('Hello from ListBookings')

  useEffect(() => {
    getAllBookings()
  }, [])
  return !loading ? (
    <div>
      <Title text1={'List'} text2={'ListBookings'}/>
      <div className={'mt-6 overflow-x-auto'}>
        <table className={'w-full border-collapse rounded-md overflow-hidden text-nowrap'}>
          <thead>
            <tr className={'bg-primary/20 text-left text-white'}>
              <th className={'p-2 font-medium pl-5'}> Username</th>
              <th className={'p-2 font-medium'}>Movie Name</th>
              <th className={'p-2 font-medium'}>Show Time</th>
              <th className={'p-2 font-medium'}>Seats</th>
              <th className={'p-2 font-medium'}>Amount</th>
            </tr>
          </thead>
          <tbody className={'text-sm font-light'}>
          {bookings.map((item, index) => (
            <tr key={index} className={'border-b border-primary/20 bg-primary/5 even:bg-primary/10'}>
              <td className={'p-2 max-w-45 pl-5'}>{item.user.name}</td>
              <td className={'p-2'}>{item.show.title}</td>
              <td className={'p-2'}>{dateFormat(item.show.showDateTime)}</td>
              <td className={'p-2'}>{Object.keys(item.bookedSeats).map(seat => (item.bookedSeats[seat])).join(', ')}</td>
              <td className={'p-2'}>{currency} {item.amount}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading/>
}

export default ListBookings