import React from 'react'

const Footer = () => {
  return (
    <div className=' bg-slate-800/60 text-white flex flex-col justify-center items-center w-full'>

        <div className='logo font-bold text-white text-lg'>
           <span className='text-indigo-500'>&lt;</span>
            
            Pass
           
           <span className='text-indigo-500'>OP/ &gt;</span>


            </div>

      <div className='flex justify-center items-center text-[12px] font-semibold text-gray-400'>
      Created with <img className='w-4 mx-1 ' src='icons/heart.png' alt=''/> by Yawar Hussain
      </div>
    </div>
  )
}

export default Footer
