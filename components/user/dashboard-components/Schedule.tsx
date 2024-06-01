import React from 'react'

const Schedule = () => {
    const list = [1, 2, 3, 4]
    return (
        <>
            <div className='flex px-4 py-1 justify-between'>
                <div>
                    <h1 className='font-bold text-xl'> Todays Schedule</h1>
                </div>
                <a href="#" className='text-maroon underline'>View All</a>
            </div>
            <div className='flex flex-col mt-2 '>
                {list.map((data,key) => (
                    <div key={key} className='flex justify-between px-7 py-1 mb-2 h-20 items-center bg-white border border-gray-300'>
                        <div className='flex flex-wrap items-center'>
                            <img src="https://images.unsplash.com/photo-1522728000856-8721ca26ccd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c29saXR1ZGV8ZW58MHx8MHx8&w=1000&q=80" alt="" className="w-14 h-14 mr-5" />
                            <p>Assignment</p>
                        </div>
                        <a href="#" className='text-maroon underline'>Join</a>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Schedule