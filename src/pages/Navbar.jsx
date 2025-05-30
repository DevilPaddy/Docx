import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full px-6 py-1.5 bg-white/2 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-b-lg backdrop-blur-[20px]'>
        <div className='text-zinc-300'>
            <Link to='/' className='font-bold text-4xl'>Docx</Link>
        </div>
    </div>
  )
}

export default Navbar