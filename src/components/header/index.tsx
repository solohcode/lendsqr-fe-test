import React, { useState } from 'react';
import { Avatar, Dropdown, MenuProps, notification } from 'antd';
import { AiOutlineSearch, AiOutlineBell, AiFillCaretDown } from 'react-icons/ai';
import { HiOutlineLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { textInclude } from '../..';
import { authAtom } from '../../atom/login';
import logo from '../../assets/images/logo.svg';
import user from '../../assets/images/user.png';
import icon from '../../assets/icons/icon.png';
import close from '../../assets/icons/close.png';

type Props = {
  open: boolean,
  setOpen: Function,
}
function Header({
  open,
  setOpen,
}: Props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState(false)
  const setAuthAtom = useSetRecoilState(authAtom);

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <HiOutlineLogout />,
      label: <p>Logout</p>,
    },
  ];

  // handle dropdown menu select / logout function 
  const handleMenu = (key: string) => {
    if(textInclude(key, "logout")){
      navigate("/")
      setAuthAtom({isLoggedIn: false, user: {}})
      notification.success({message: "Logged out"})
    } 
  }
  return (
    <div className='w-full bg-white shadow-sm fixed top-0 z-30 p-5 flex justify-between md:grid md:grid-cols-2 items-center'>
      <div className='flex justify-between items-center'>
        <img className='w-[140px] hidden md:block' src={logo} alt='logo' />
        <img className='block md:hidden' src={open ? close : icon} alt='logo' onClick={() => setOpen(!open)} />
        <div className={`w-full md:w-[350px] h-[40px] flex ${search ? "!h-[60px] px-5 py-3 absolute top-20 bg-[#f3fcfc] left-0 right-0" : "hidden lg:flex"} lg:!relative lg:top-auto`}>
          <input
            type='search'
            placeholder='Search for anything'
            className='w-full px-3 py-1 ring-0 focus:ring-teal placeholder:text-gray border border-fade rounded-l-lg'
          />
          <button className='px-3 py-1 text-sm font-bold bg-teal border-0 text-white hover:opacity-90 rounded-r-lg'><AiOutlineSearch /></button>
        </div>
      </div>
      <div className='flex items-center justify-end text-blue space-x-3 md:space-x-5 md:pr-10'>
        <p className='underline hidden md:block cursor-pointer'>Docs</p>
        <AiOutlineSearch onClick={() => setSearch(!search)} size={23} className='md:hidden' />
        <AiOutlineBell size={23} className='cursor-pointer' />
        <Dropdown menu={{ items, onClick: ({key}) => handleMenu(key) }} trigger={['click']}>
          <div className='flex items-center space-x-3 cursor-pointer'>
            <Avatar src={user} shape='circle' className='w-[40px] h-[40px]' alt='user' />
            <p className='font-semibold'>Adedeji</p>
            <AiFillCaretDown size={12} />
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header