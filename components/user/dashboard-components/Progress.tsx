import React from 'react'
import ArrowRightIcon from '@ui/icons/arrowRightIcon'
const Progress = () => {
    const progressData = [
        { colour: "bg-red-400", percent: "24", title: "Classes Attended" },
        { colour: "bg-green-600", percent: "30", title: "Assessments Taken" },
        { colour: "bg-blue-400", percent: "15", title: 'Metric 4' },
        { colour: "bg-yellow-400", percent: "11", title: 'Metric 5' },
    ]
    return (
        <>
            <div className='flex items-center justify-between mb-1 px-5'>
                <p className='text-2xl text-gray-500'>0%</p>
                <p className='text-2xl text-maroon'>50%</p>
                <p className='text-2xl text-gray-500'>100%</p>
            </div>
            <div className='px-5'>
                <div className='w-full bg-gray-300 flex'>
                    {progressData.map((data, key) => (
                        <div className={`w-[${data.percent}/100] px-2 py-1 h-10 ${data.colour}`} key={key}></div>
                    ))}
                </div>
            </div>
            <div className='mx-3 flex my-3 justify-between items-center px-5 lg:flex-row md:flex-col sm:flex-col'>
                {progressData.map((data, key) => (
                    <div key={key} className='flex flex-col'>
                        <p className='text'>{data.title}</p>
                        <div className='flex items-center'>
                            <div className={`w-8 h-4 p-2 ${data.colour} mr-3`}></div>
                            <span className='text font-bold text-xl'>100</span>
                        </div>
                    </div>
                ))}
                <button className='px-5 py-2 flex items-center bg-[rgba(114, 17, 84, 0.1)] text-[#721154] border border-purple-200'>
                    Course at Glance
                    <ArrowRightIcon/>
                </button>
            </div>
        </>
    )
}

export default Progress