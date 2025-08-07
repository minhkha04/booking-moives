import React, { useState } from 'react'
import BlurCircle from './BlurCircle.jsx'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) => {

  const [selectedDate, setSelectedDate] = useState(null)
  const navigate = useNavigate()

  const onBookHandler = () => {
    if (!selectedDate) {
      return toast('Please select a date')
    }
    navigate(`/movies/${id}/${selectedDate}`)
    scrollTo(0, 0)
  }

  return (
    <div id={'dateSelect'} className={'pt-30'}>
      <div
        className={'flex flex-col gap-10 md:flex-row justify-between items-center relative p-8 bg-primary/10 rounded-lg'}>
        <BlurCircle top={'-100px'} left={'-100px'}/>
        <BlurCircle top={'100px'} right={'0px'}/>
        <div>
          <p className={'text-lg font-semibold'}>Choose Date</p>
          <div className={'flex items-center gap-6 text-sm mt-5'}>
            <ChevronLeftIcon width={28}/>
            <span className={'grid grid-cols-3 gap-4 md:flex flex-wrap md:max-w-lg'}>
              {Object.keys(dateTime).map(date => (
                <button onClick={() => {
                  setSelectedDate(date)
                }} key={date}
                        className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selectedDate === date ? 'bg-primary text-white' : 'border border-primary/70'}`}>
                  <span>{new Date(date).getDate()}</span>
                  <span>{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28}/>
          </div>
        </div>
        <button onClick={onBookHandler}
                className={'px-8 py-2 text-white bg-primary hover:bg-primary/90 rounded transition-all cursor-pointer'}>Book now
        </button>
      </div>
    </div>
  )
}

export default DateSelect