import React from 'react'
import { dummyShowsData } from '../assets/assets.js'
import MovieCard from '../components/MovieCard.jsx'
import BlurCircle from '../components/BlurCircle.jsx'

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className={'relative my-40 mb-60 md:px-60 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'}>
      <BlurCircle top={'150px'} left={'0'}/>
      <BlurCircle bottom={'50px'} right={'50px'}/>
      <h1 className={'text-lg font-medium my-4'}>Now Showing</h1>
      <div className={'flex flex-wrap gap-8 max-sm:justify-center'}>
        {dummyShowsData.map((show) => (
          <MovieCard key={show._id} movie={show}/>
        ))}
      </div>
    </div>
  ) : (
    <div className={'flex flex-col justify-center h-screen'}>
      <h1 className={'text-3xl font-bold text-center'}>No movies available</h1>
    </div>
  )
}

export default Movies
