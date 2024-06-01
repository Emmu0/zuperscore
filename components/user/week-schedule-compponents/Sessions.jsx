import React from 'react'

const Sessions = () => {
    const list=[1,2,3,4]
  return (
   <>
        <>
            <div className='flex py-1 w-full justify-between'>
                <div>
                    <h1 className='font-bold text-2xl'>Today</h1>
                </div>
                
            </div>
            <div className='flex flex-col mt-5 '>
                {list.map((data,key) => (
                    <div key={key} className='flex px-7 w-full h-20 items-center bg-white mb-2 py-1  border border-light'>
                        <div className='flex  items-center'>
                            <div>
                            <img src="https://images.unsplash.com/photo-1522728000856-8721ca26ccd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c29saXR1ZGV8ZW58MHx8MHx8&w=1000&q=80" alt="" className="w-14 h-14 mr-5" />
                            </div>
                            <div>
                                <h6 className='font-semibold'>Session Name</h6>
                                <p className='text-sm text-gray-400'>Time period of lesson</p>
                            </div>
                        </div>                       
                    </div>
                ))}
            </div>
        </>
   </>
  )
}

export default Sessions