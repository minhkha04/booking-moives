import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets.js'
import BlurCircle from '../components/BlurCircle.jsx'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/timeFormat.js'
import DateSelect from '../components/DateSelect.jsx'
import MovieCard from '../components/MovieCard.jsx'
import Loading from '../components/Loading.jsx'

const MoviesDetails = () => {

  const { id } = useParams()
  const [show, setShow] = useState(null)
  const navigate = useNavigate()

  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id)
    if(show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }
  }

  useEffect(() => {
    getShow()
  }, [id])
  return show ? (
    <div className={'px-6 md:px-16 lg:px-40 pt-30 md:pt-50'}>
      <div className={'flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'}>
        <img src={show.movie.poster_path} alt={'movie'}
             className={'rounded-xl h-104 max-md:mx-auto max-w-70 object-cover'}/>
        <div className={'relative flex flex-col gap-3'}>
          <BlurCircle top={'-100px'} right={'-100px'}/>
          <p className={'text-primary'}>ENGLISH</p>
          <h1 className={'text-4xl font-semibold max-w-96 text-balance'}>{show.movie.title}</h1>
          <div className={'flex items-center text-gray-300 gap-2'}>
            <StarIcon className={'w-5 h-5 text-primary fill-primary'}/>
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className={'text-gray-400 mt-2 text-sm leading-tight max-w-xl'}>{show.movie.overview}</p>
          <p>
            {timeFormat(show.movie.runtime)} • {show.movie.genres.map(genre => genre.name).join(', ')} • {show.movie.release_date.split('-')[0]}
          </p>
          <div className={'flex flex-wrap items-center gap-4 mt-4'}>
            <button className={'flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-500 transition rounded-md font-medium active:scale-95 cursor-pointer'}>
              <PlayCircleIcon className={'w-5 h-5'}/>
              Watch Trailer
            </button>

            <a href={'#dateSelect'} className={'px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'}>By Tickets</a>
            <button className={'bg-gray-700  transition rounded-full p-2.5 active:scale-95 cursor-pointer'}>
              <Heart className={'w-5 h-5'}/>
            </button>
          </div>
        </div>
      </div>
      <p>Your Favorite Cast</p>
      <div className={'overflow-x-auto no-scrollbar mt-8 pb-4'}>
        <div className={'flex items-center w-max px-4 gap-4'}>
          {show.movie.casts.slice(0, 16).map((cast, index) => (
            <div key={index} className={'flex flex-col items-center text-center'}>
              <img src={cast.profile_path} alt={'cast'} className={'rounded-full w-16 h-20 md:h-20 object-cover aspect-square'}/>
              <p className={'font-medium text-xs mt-3'}>{cast.name}</p>
            </div>
          ))}
        </div>
      </div>
      <DateSelect dateTime={show.dateTime} id={id} />

      <p className={'text-lg font-medium mt-20  mb-8'}>You May Also Like</p>
      <div className={'flex flex-wrap gap-8 justify-center'}>
        {
          dummyShowsData.slice(0, 5).map((show) => (
            <MovieCard key={show._id} movie={show}/>
          ))
        }
      </div>
      <div className={'flex justify-center mt-20'}>
        <button onClick={() => {
          navigate(`/movies`)
          scrollTo(0, 0)
        }} className={'p-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'}> Show more
        </button>
      </div>
    </div>
  ) : (
    <Loading/>
  )
}

export default MoviesDetails
