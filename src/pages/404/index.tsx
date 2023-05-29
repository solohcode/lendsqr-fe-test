import React from 'react'
import logo from '../../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';


function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='text-center mx-auto space-y-5'>
        <img className='mx-auto' alt='logo' src={logo} />
        <p className='px-5'>Oops!, seems the page you seek doesn't exist <br /> let's retrace your click...</p>
        <button
          onClick={() => navigate(-1)}
          className='py-3 px-10 text-sm font-bold bg-teal text-white hover:opacity-90 rounded-lg'
        >
          BACK
        </button>
      </div>
    </div>
  )
}

export default NotFound