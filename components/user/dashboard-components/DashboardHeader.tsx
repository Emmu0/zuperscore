import React from 'react'

const DashboardHeader = () => {
    return (
        <>
            <div className='flex justify-between items-center lg:flex-row md:flex-col sm:flex-col'>
                <div className='flex flex-col lg:mb-0 md:mb-3 sm:mb-3'>
                    <h1 className='text-3xl font-bold'>Welcome, 
                    <span className='text-3xl font-bold text-maroon'>  Bhavesh Raja</span></h1>
                    <p className='mt-2 text-slate-500 text-textslate'>An investment in knowledge pays the best interest.</p>
                </div>
                <div className='px-10 py-2 flex bg-white flex-row flex-wrap items-center justify-between'>
                <button>
                    {/* <img src="../images/sat.png" alt="no" /> */}
                    Scholastic Assessment Test
                </button>

                {/* <FaAngleDown className="ml-2" /> */}
            </div>
            </div>
        </>
    )
}

export default DashboardHeader