import React from 'react'

const SlotDetails = () => {
    return (
        <>
            <div className='flex px-4 py-1 flex'>
                <div>
                    <h1 className='mt-3 font-bold text-xl'>Slot Details</h1>
                </div>
            </div>
            <div className=' mx-2 mt-2 flex-col bg-white border border-gray-300 py-3'>
                <p className=' px-4 my-3 '>Date : 12th May 2022</p>
                <p className=' px-4 my-3 '>Time : 10:00-10:50</p>
                <p className=' px-4 my-3 '>Teacher : Vamsi Kurama</p>
                <p className=' px-4 my-3 '>Student : Prateek(You)</p>
                <p className=' px-4 my-3 '>Detail : 12th May 2022</p>

            </div>
        </>
    )
}

export default SlotDetails