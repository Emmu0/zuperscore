import React from 'react'

const TimeSlots = () => {

    const slots = [
        {
            slot: '10:00-10:50',
            disabled: true
        },
        {
            slot: '11:00-11:50',
            disabled: true
        }, {
            slot: '12:00-12:50',
            disabled: true
        }, {
            slot: '13:00-13:50',
            disabled: false
        }, {
            slot: '14:00-14:50',
            disabled: false
        }, {
            slot: '15:00-15:50',
            disabled: false
        }, {
            slot: '16:00-16:50',
            disabled: false
        }, {
            slot: '17:00-17:50',
            disabled: false
        }, {
            slot: '18:00-18:50',
            disabled: false
        },
        {
            slot: '19:00-19:50',
            disabled: false
        },
        {
            slot: '20:00-20:50',
            disabled: false
        },
    ]


    return (
        <>
            <div className='flex px-4 py-1 flex'>
                <div>
                    <h1 className='font-bold text-2xl'>Available Time Slots</h1>
                </div>
            </div>

            <div className='flex items-center flex-wrap'>

                {slots.map((data, key) => (
                    <button key={key} className={data.disabled ?
                        'px-16 py-2 border border-gray-300 bg-gray-200 m-2 mx-2 my-4 text-gray-500' :
                        'px-16 py-2 border border-gray-300 bg-white m-2 mx-2 my-4 hover:bg-cream hover:border-maroon hover:text-maroon'} disabled={data.disabled}>
                        {data.slot}
                    </button>
                ))}
            </div>
        </>
    )
}

export default TimeSlots