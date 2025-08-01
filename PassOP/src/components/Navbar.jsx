import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-800/80 text-white sticky top-0 w-full'>
        <div className="mycontainer px-4 py-5 h-14 flex justify-between items-center">
        <div className='logo font-bold text-white text-2xl'>
           <span className='text-indigo-500'>&lt;</span>
            
            Pass
           
           <span className='text-indigo-500'>OP/ &gt;</span>

            </div>
     {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href='/'>Home</a>
            <a className='hover:font-bold' href='#'>About</a>
            <a className='hover:font-bold' href='#'>Contact</a>
        </li>
     </ul> */}

     <button className='text-white bg-indigo-700/40 hover:bg-indigo-700/80 my-5 rounded-full flex justify-between items-center cursor-pointer ring-indigo-300 ring-1'>
      <img className='invert w-10 p-1' src='icons/github.svg' alt="github logo" />
      <span className='font-bold px-2'>GitHub</span>
     </button>
     </div>
    </nav>
  )
}

export default Navbar
