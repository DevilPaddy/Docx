import React from 'react'

const Footer = () => {
  return (
    <div className='bg-zinc-900 w-full px-4 py-1 flex flex-col items-center mt-8'>
        <p className='text-zinc-600 font-light text-xl'>&copy; {new Date().getFullYear()} Docx. All rights reserved.</p>
        <p className='text-zinc-600 font-light text-xl'>Made by Anuj Belsare</p>
    </div>
  )
}

export default Footer