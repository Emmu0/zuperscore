import React from 'react'
import SessionDetails from './SessionDetails';


const Week = ({ data }) => {
  return (
    <>
      <div className={` grid grid-rows-100 w-full mt-4`}>
        <div className={`px-2 row-span-10 flex flex-col text-gray-400 py-1  border  border-dark ${data.isCurrentDay ? 'border border-b-0 bg-lightpurple text-[#CC96AE] border-violet-0' : 'bg-[#FAFAFA]'}`}>
          {/* <span className='border-collapse bg-[#FAFAFA] px-2 py-1 text-left border-b-0 border border-dark text-gray-400 '>{data.day}</span> */}
          <p className=''>{data.day}</p>
          <p className=' mt-1'>
            {data.date.split("-").pop()?.replace(/^0/, "") === "1"
              ? data.value
              : data.date.split("-").pop()?.replace(/^0/, "")}
          </p>
        </div>
        <div className={`bg-white border border-light row-span-90 flex flex-col h-[65vh] pt-3 ${data.isCurrentDay ? 'border text-violet-0 border-violet-0 ' : null}`}>
          <ul className="text-[#222222]">
            {data.events?.map((event, key) => (
              <SessionDetails key={key} details={event} />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Week