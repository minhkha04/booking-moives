import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets.js'
import Loading from '../../components/Loading.jsx'
import Title from '../../components/admin/Title.jsx'
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react'
import { kConverter } from '../../lib/kConverter.js'

const AddShow = () => {

  const currency = import.meta.env.VITE_CURRENCY
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [selectedMovies, setSelectedMovies] = useState(null)
  const [dateTimeSelected, setDateTimeSelected] = useState({})
  const [dateTimeInput, setDateTimeInput] = useState('')
  const [showPrice, setShowPrice] = useState('')

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData)
  }

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;

    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelected((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
  };


  const handleRemoveTime = (date, time) => {
    setDateTimeSelected(prev => {
      const filteredTime = prev[date].filter(t => t !== time)
      if (filteredTime.length === 0) {
        const { [date]: _, ...rest } = prev
        return rest
      }
      return {
        ...prev,
        [date]: filteredTime
      }
    })
  }

  useEffect(() => {
    fetchNowPlayingMovies()
  }, [])

  return nowPlayingMovies.length > 0 ? (
    <div>
      <Title text1={'Add'} text2={'Show'}/>
      <p className={'mt-10 text-lg font-medium'}>Now Playing Movies</p>
      <div className={'overflow-x-auto pb-4'}>
        <div className={'group flex flex-wrap gap-4 mt-4 w-max'}>
          {nowPlayingMovies.map((movie) => (
            <div key={movie.id}
                 className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:translate-y-1 transition duration-300`}>
              <div className={'relative rounded-lg  overflow-hidden'} onClick={() => {
                setSelectedMovies(movie.id)
              }}>
                <img src={movie.poster_path} alt={'poster'} className={'brightness-90 w-full object-cover'}/>
                <div
                  className={'text-sm flex items-center justify-between p-2 bg-black/70 w-full  absolute bottom-0 left-0'}>
                  <p className={'flex items-center gap-1 text-gray-400'}>
                    <StarIcon className={'w-4 h-4 text-primary fill-primary'}/>
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className={'text-gray-300'}>{kConverter(movie.vote_count)}</p>
                </div>

              </div>
              {selectedMovies === movie.id && (
                <div className={'absolute top-2 right-2 flex bg-primary h-6 w-6 rounded justify-center items-center'}>
                  <CheckIcon className={'w-4 h-4 text-white'} strokeWidth={2.5}/>
                </div>
              )}
              <p className={'font-medium truncate'}>{movie.title}</p>
              <p className={'text-gray-400 text-sm'}>{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={'mt-8'}>
        <label className={'block text-sm font-medium mb-2'}>Show Price</label>
        <div className={'inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'}>
          <p className={'text-gray-400 text-sm'}>{currency}</p>
          <input type={'number'}
                 className={'outline-none'}
                 value={showPrice}
                 onChange={(e) => setShowPrice(e.target.value)}
                 placeholder={'Enter show price'}
                 min={0}
          />
        </div>
      </div>
      <div className={'mt-6'}>
        <label className={'block text-sm font-medium mb-2'}>Select Date and Time</label>
        <div className={'inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg'}>
          <input type={'datetime-local'} value={dateTimeInput} onChange={(e) => setDateTimeInput(e.target.value)}
                 className={'outline-none rounded-md'}/>
          <button onClick={handleDateTimeAdd}
                  className={'bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer'}>Add
            time
          </button>
        </div>
      </div>
      {Object.keys(dateTimeSelected).length > 0 && (
        <div className={'mt-6'}>
          <h2 className={'mb-2'}>Select Date-Time</h2>
          <ul className={'space-y-3'}>
            {Object.entries(dateTimeSelected).map(([date, times]) => (
              <li key={date}>
                <div className={'font-medium'}>{date}</div>
                <div className={'flex flex-wrap gap-2 mt-1 text-sm'}>
                  {times.map((time) => (
                    <div key={time} className={'border border-primary px-2 py-1 rounded flex items-center'}>
                      <span>{time}</span>
                      <DeleteIcon className={'ml-2 text-red-500 hover:text-red-700 cursor-pointer'} onClick={() => {handleRemoveTime(date, time)}} width={15}/>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className={'mt-10 bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer'}>Add show</button>
    </div>
  ) : <Loading/>
}

export default AddShow