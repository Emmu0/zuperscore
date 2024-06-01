import React from 'react'
import { BinIcon, DateIcon, PencilIcon, TimeIcon } from "@ui/icons";
import { Popover } from '@headlessui/react'
import Button from "@components/buttons";
const SessionDetails = ({details}) => {
  return (
    <>
    <Popover key={details.id} className='relative'>
                
                <p className="px-1 py-1 m-1 rounded-md text-sm font-semibold text-gray-700 hover:bg-border-light ">
                  <Popover.Button className='w-[100%] text-left '>
                    {details.name}
                  </Popover.Button>
                </p>
                <Popover.Panel>
                  <div className='absolute left-[-300px] bottom-0 bg-yellow-0 p-2 z-100 font-semibold  text-black rounded-[4px] shadow-lg w-[300px]'>
                    <div className="m-2 my-4">
                      <p className="text-lg">{details.name}</p>
                    </div>
                    <div className="m-2 my-4">
                      <p className=" flex justify-start items-center">
                        <DateIcon className="mr-2" fill="black" /> {details.datetime}
                      </p>
                    </div>
                    <div className="m-2">
                      <p className=" flex justify-start items-center">
                        <TimeIcon className="mr-2" /> {details.datetime}
                      </p>
                    </div>
                    <div className="flex justify-between items-center m-2 my-4">
                      <div>
                        <Button className="px-8">Join</Button>
                      </div>
                      <div className="flex justify-end items-center">
                        <PencilIcon className="mr-2" fill={"#CC96AE"} />
                        <BinIcon className="ml-2" fill={"#CC96AE"} />
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
            </Popover>
    </>
  )
}

export default SessionDetails