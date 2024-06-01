import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { RadioGroup } from '@headlessui/react'
import Day from './Day'
const DefaultCalendar = ({ }, ref) => {

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const [nav, setNav] = useState(0)
    const [clicked, setClicked] = useState()
    const [events, setEvents] = useState([])
    const [days, setDays] = useState([])
    const [dateDisplay, setDateDisplay] = useState()
    const [selectedDate, setSelectedDate] = useState()
    const [currentDay,setCurrentDay] = useState()

    const nextRef = useRef()
    const prevRef = useRef()
    const currentRef = useRef()

    useImperativeHandle(ref, () => ({
        nextMonth: () => setNav(nav + 1),
        prevMonth: () => setNav(nav - 1),
        currentMonth: () => setNav(0)
    }),)
    
    const eventForDate = date => events.find(e => e.date === date)

    useEffect(() => {
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(dt.getMonth() + nav)
        }
        else {
            dt.setMonth(dt.getMonth())
        }

        const day = dt.getDate()
        const month = dt.getMonth()
        const year = dt.getFullYear()

        setCurrentDay(`${month}/${day}/${year}`)

        const firstDayOfMonth = new Date(year, month, 1)
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

        setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`)
        let daysArr = []
        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const dayString = `${month + 1}/${i - paddingDays}/${year}`;

            if (i > paddingDays) {
                daysArr.push({
                    value: i - paddingDays,
                    event: eventForDate(dayString),
                    isCurrentDay: i - paddingDays === day && nav === 0,
                    date: dayString,
                });
            } else {
                daysArr.push({
                    value: 'padding',
                    event: null,
                    isCurrentDay: false,
                    date: '',
                });
            }
        }
        // prevMonth()
        setDays(daysArr);

    }, [nav, events, weekdays])
    return (
        <>
            <div className='flex px-4 py-1 flex-col relative'>
                <div>
                    <h1 className='font-bold text-2xl mb-5'>Select Date</h1>
                </div>
                <div>

                    <div className='flex flex-wrap items-center bg-white border p-4 border-gray-300'
                        ref={ref}
                    >
                        <div className='flex  w-full items-center justify-between flex-row'>
                            <button className='pr-1 ' onClick={() => setNav(nav - 1)} ref={prevRef}>
                                <ChevronLeftIcon className='w-5 h-5' />

                            </button>
                            <div>
                                <span className='text-xl font-bold hover:cursor-pointer' ref={currentRef} onClick={() => setNav(0)}>{dateDisplay}</span>
                            </div>
                            <div>
                                <button className=' pl-1' ref={nextRef} onClick={() => setNav(nav + 1)}>
                                    <ChevronRightIcon className='w-5 h-5' />

                                </button>
                            </div>
                        </div>
                        <RadioGroup value={selectedDate} onChange={setSelectedDate}>
                            <div className='grid grid-cols-7 grid-rows-8 grid-flow-row gap-2 my-3 mx-1 flex items-center'>
                                <span className='px-2 text-gray-400'>SUN</span>
                                <span className='px-2 text-gray-400'>MON</span>
                                <span className='px-2 text-gray-400'>TUE</span>
                                <span className='px-2 text-gray-400'>WED</span>
                                <span className='px-2 text-gray-400'>THU</span>
                                <span className='px-2 text-gray-400'>FRI</span>
                                <span className='px-2 text-gray-400'>SAT</span>
                                {days.map((d, index) =>
                                (<RadioGroup.Option
                                    key={index}
                                    value={d.date}

                                    disabled={d.value !== 'padding' ? false : true }
                                    className={({ active }) => `${active ? 'p-2 border text-center border-gray-100 text-maroon  bg-cream cursor-pointer' : 'p-2 border text-center border-gray-100 text-dark-100 border-dark bg-light-0 cursor-pointer'} ${d.value === 'padding' ? 'p-5 bg-gray-100 border border-gray-200 cursor-not-allowed' : null} ${d.isCurrentDay ? 'border text-violet-0 border-violet-0' : null}` }
                                    onClick={() => {
                                        if (d.value !== 'padding') {
                                            setClicked(d)
                                        }
                                        setSelectedDate(d.date)
                                    }}
                                >
                                    {d.value === 'padding' ? null : d.value}
                                </RadioGroup.Option>
                                )
                                )}

                            </div>
                        </RadioGroup>
                    </div>

                </div>
            </div>
        </>
    )
}

export default React.forwardRef(DefaultCalendar)