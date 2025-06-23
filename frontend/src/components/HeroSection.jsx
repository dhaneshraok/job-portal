import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (e) => {
        e.preventDefault()
        if (query.trim()) {
            dispatch(setSearchedQuery(query.trim()))
            navigate("/browse")
        }
    }

    return (
        <div className='text-center py-16 bg-gradient-to-b from-purple-900 to-transparent'>
            <div className='flex flex-col gap-6'>
                <span className='mx-auto px-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-md text-[#F83002] font-medium text-sm shadow-md'>
                    No. 1 Job Hunt Website
                </span>
                <h1 className='text-4xl sm:text-5xl font-bold text-white leading-tight'>
                    Search, Apply & <br /> Get Your <span className='text-[#F83002]'>Dream Jobs</span>
                </h1>
                <p className='text-gray-300 text-sm sm:text-base mx-auto max-w-lg'>
                    Unlock your career potential with the best job opportunities tailored for you.
                </p>
                <form onSubmit={searchJobHandler} className='flex w-full max-w-xl mx-auto shadow-lg rounded-full overflow-hidden'>
                    <input
                        type='text'
                        placeholder='Find your dream jobs'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full bg-white bg-opacity-10 backdrop-blur-md text-white placeholder-gray-400 px-6 py-3 text-sm focus:ring-2 focus:ring-pink-500 transition-all duration-300'
                        aria-label='Search jobs'
                    />
                    <Button
                        type='submit'
                        className='rounded-r-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300'
                    >
                        <Search className='h-5 w-5' />
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default HeroSection