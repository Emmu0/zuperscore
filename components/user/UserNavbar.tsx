import React from 'react'
// import { FaBell } from 'react-icons/fa'
const UserNavbar = () => {
    return (
        <>

            <header className="text-cream body-font bg-maroon py-1">
                <div className="container mx-auto flex justify-between items-center flex-wrap p-3 flex-col lg:flex-row md:flex-column sm:flex-col items-center">
                    <div className="ml-3 text-2xl font-semibold flex items-center">
                        <span className=" text-2xl font-bold">Z</span>
                        uperscore</div>
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center lg:flex-row md:flex-column sm:flex-col text-base justify-center">
                        <button className="mr-7 hover:text-gray-900">Dashboard</button>
                        <button className="mr-7 hover:text-gray-900">Assessments</button>
                        <button className="mr-7 hover:text-gray-900">Calendar</button>
                        <button className="mr-7 hover:text-gray-900">Homework</button>
                        <button className="mr-7 hover:text-gray-900">Reports</button>

                    </nav>
                    <button>
                        {/* <FaBell classNameName="text-cream" /> */}
                    </button>
                    <button className="inline-flex items-center ">
                        <img className="inline object-cover w-8 h-8 mr-2 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image" />
                    </button>
                </div>
            </header>

        </>
    )
}

export default UserNavbar