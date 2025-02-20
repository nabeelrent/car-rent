import React from 'react'
import { useSelector } from 'react-redux';

function Navbar() {
  const pageName = useSelector((state) => state.page.pageName); // Get state

  return (
    <div className=' w-full bg-green h-16 flex justify-start bg-gradient-to-r from-[#B41749] to-[#387BBF] '>
        <div className=' w-[14%] border-r-2 border-gary-100'>
            
        </div>
        <div className=' w-[86%] flex justify-start items-center px-10 font-bold'>
          <span className='text-2xl text-white'>          {pageName}
          </span>
            

        </div>

      
    </div>
  )
}

export default Navbar
