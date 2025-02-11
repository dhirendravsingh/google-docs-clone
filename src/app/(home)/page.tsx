import React from 'react'
import Link from 'next/link'
import { Navbar } from './navbar'
const Home = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <Navbar/>
      </div>
      <div className='mt-16'>
        <Link href="/documents/id">
        <button>Click here to open documents</button> 
    </Link>
    <h3 className='text-xl'>Docs</h3>
    </div>
       
    </div>
    
          )
}

export default Home
