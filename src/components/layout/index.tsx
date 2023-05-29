import React, { ReactElement, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { Button, notification } from "antd";
import Header from '../header';
import SideBar from '../sideBar';
import { authAtom } from '../../atom/login';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: ReactElement
}
function Layout({
  children
} : Props) {
  const navigate = useNavigate();
  const { isLoggedIn } = useRecoilValue(authAtom);
  const [open, setOpen] = useState(false);

  // if not logged in return to first page which is login page 
  useEffect(() => {if(!isLoggedIn){
    navigate("/");
    notification.warning({key: "auth", message: "Not authenticated"})
  }}, [isLoggedIn, navigate])
  return (
    <div className='w-full min-h-screen relative bg-shade'>
      <Header open={open} setOpen={setOpen} />
      <div className='w-full flex pt-20'>
        <SideBar open={open} setOpen={setOpen} />
        <Button onClick={() => setOpen(!open)} size='large' className='fixed top-36 z-10 left-0 items-center !rounded-l-none !text-xl bg-teal text-white' color='#fff' icon={<AiOutlineMenu />} />
        <div className='w-full md:w-[70%] lg:w-[80%] p-5 md:p-10'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout