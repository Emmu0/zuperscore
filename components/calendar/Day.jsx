import React from 'react'

const Day = ({ day, onClick }) => {
    const className = `${day.value === 'padding' ?
     'p-5 border border-gray-100 bg-gray-100 text-gray-300 ':
      'p-2 border border-gray-100 text-maroon border-maroon bg-cream cursor-pointer'}`
    return (
        <>
            <span className={className}>

                {day.value === 'padding' ? '' : day.value}
            </span>
        </>
    )
}

export default Day