import React from 'react'
import sad from '../../assets/icons/sad.png';


function Error() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='text-center mx-auto space-y-5'>
        <img className='mx-auto' alt='logo' src={sad} />
        <p>Ouch!, something went wrong <br /> thinking it might be network <br /> let's try...</p>
        <button
          onClick={() => window.location.reload()}
          className='py-3 px-10 text-sm font-bold bg-teal text-white hover:opacity-90 rounded-lg'
        >
          RELOAD
        </button>
      </div>
    </div>
  )
}

export default Error