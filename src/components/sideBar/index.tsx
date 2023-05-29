import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineDown } from 'react-icons/ai';
import { navList } from './data';
import organization from '../../assets/icons/organization.png';


type Props = {
  open: boolean,
  setOpen: Function,
}
function SideBar({
  open,
  setOpen
}: Props) {
  const { pathname } = useLocation()
  return (
    <div className={`w-0 md:w-[30%] lg:w-[20%] h-[cal(100vh - 5rem)] ${open ? "block" : "hidden md:block"} bg-white`}>
      <div className={`w-[70%] md:w-[30%] lg:w-[20%] h-[89vh] z-20 ${open ? "block" : "hidden md:block"} bg-white overflow-y-auto text-base shadow-md fixed pt-1 pb-10`}>
        <button className='w-full flex justify-center items-center space-x-2 text-blue my-10'>
          <img alt='organization' src={organization} />
          <p>Switch Organization</p>
          <AiOutlineDown />
        </button>

        <div className='w-full h-full space-y-1 text-gray mb-10'>
          {navList.map(({label, url, img}) => url ? (
            <Link
              to={String(url)}
              key={label}
              onClick={() => setOpen(!open)}
              className={`w-full flex space-x-3 items-center py-2 pl-6 text-[#7a8cb1] ${url && "hover:bg-[#f3fcfc] hover:text-blue"} ${pathname.includes(String(url)) && "bg-[#f3fcfc] !text-blue border-l-4 border-teal"}`}
            >
              {img && <img src={img} alt={label} />}
              <p>{label}</p>
            </Link>
          ) : (
            <p key={label} className='pl-6 pt-10 font-medium'>
              {label}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar