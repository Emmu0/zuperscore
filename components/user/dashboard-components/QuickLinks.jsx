import React from 'react'
import { HomeIcon,BookmarkSquareIcon, } from '@heroicons/react/solid'
const QuickLinks = () => {
    const list = [
        {
            name: "Homework",
            icon: <HomeIcon />
        },
        {
            name: "Classwork Assignments",
            icon: <BookmarkSquareIcon/>,
        },
        {
            name: "Test Analysis",
            icon: ""
        }, {
            name: "Testing",
            icon: ''
        },
        {
            name: "Videos",
            icon: ''
        }, {
            name: "Documents",
            icon: ''
        }]
    return (
        <>
            <div className='flex px-4 py-1 justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Quick Links</h1>
                </div>
            </div>

            <div className='ml-4 flex flex-col flex-wrap'>
                {list.map((data, key) => (
                    <div key={key} className='w-full px-5 my-1 bg-white py-3  flex items-center border border-gray-300'>
                        <data.icon className='text-goldenyellow mr-3 w-5 h-5' />
                        {data.name}
                    </div>
                ))}
            </div>
        </>
    )
}

export default QuickLinks