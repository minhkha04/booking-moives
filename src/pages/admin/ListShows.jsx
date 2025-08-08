import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets.js'
import Loading from '../../components/Loading.jsx'
import Title from '../../components/admin/Title.jsx'
import { dateFormat } from '../../lib/dateFormat.js'

const ListShows = () => {

  const currency = import.meta.env.VITE_CURRENCY
  const [loading, setLoading] = useState(true)
  const [shows, setShows] = useState([])

  const getAllShows = async () => {
    try {
      setShows([{
        movie: dummyShowsData[0],
        showDateTime: '2023-10-01T18:00:00Z',
        showPrice: 59,
        occupiedSeats: {
          A1: 'user_1',
          B1: 'user_2',
          C1: 'user_3',
        },
      }])
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllShows()
  }, [])

  return !loading ? (
    <div>
      <Title text1={'List'} text2={'Shows'}/>
      <div className={'mt-6 overflow-x-auto'}>
        <table className={'w-full border-collapse rounded-md overflow-hidden text-nowrap'}>
          <thead>
          <tr className={'bg-primary/20 text-left text-white'}>
            <th className={'p-2 font-medium pl-5'}>Movie Name</th>
            <th className={'p-2 font-medium'}>Show time</th>
            <th className={'p-2 font-medium'}>Total Bookings</th>
            <th className={'p-2 font-medium'}>Earnings</th>
          </tr>
          </thead>
          <tbody className={'text-sm font-light'}>
          {shows.map((show, index) => (
            <tr key={index} className={'border-b border-primary/10 bg-primary/5 even:bg-primary/10'}>
              <td className={'p-2 max-w-45 pl-5'}>{show.movie.title}</td>
              <td className={'p-2'}>{dateFormat(show.showDateTime)}</td>
              <td className={'p-2'}>{Object.keys(show.occupiedSeats).length}</td>
              <td className={'p-2'}>{currency} {show.showPrice * Object.keys(show.occupiedSeats).length}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading/>
}

export default ListShows