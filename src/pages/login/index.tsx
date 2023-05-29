import React, { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import loginImg from '../../assets/images/login_image.svg';
import { UserData, authAtom } from '../../atom/login';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const setAuthAtom = useSetRecoilState(authAtom);

  // handle submit function i.e on form submit 
  const handleSubmit = (data: UserData) => {
    setLoading(!loading)
    setAuthAtom({
      isLoggedIn: true,
      user: data
    })
    setTimeout(() => {
      navigate("/users")
      setLoading(!loading)
      notification.success({message: "Logged in"})
    }, 5000);
  }
  return (
    <div className='w-full h-screen grid grid-cols-1 md:grid-cols-2'>
      <div className='w-full md:h-full px-5 pt-10 md:p-10 lg:p-20 relative'>
        <div>
          <img className='mx-auto md:mx-0' alt='logo' src={logo} />
        </div>
        <div className='hidden md:block absolute top-[50%] left-0 right-0 -translate-y-[50%]'>
          <img className='md:w-[85%] mx-auto' alt='login img' src={loginImg} />
        </div>
      </div>
      <div className='w-full md:h-full px-5 md:flex md:items-center md:justify-center shadow-md'>
        <div className='w-full md:w-[70%] space-y-10 md:space-y-14'>
          <div className='text-center md:text-start'>
            <p className='text-4xl text-blue font-bold ff-avenir-bold'>Welcome!</p>
            <p className='text-lg text-gray'>Enter details to login.</p>
          </div>
          <Form className='space-y-5' onFinish={handleSubmit}>
            <Form.Item name="email">
              <Input
                required
                type='email'
                placeholder='Email'
                className='w-full p-3 ring-0 focus:ring-teal placeholder:text-gray border-2 border-fade rounded-md'
              />
            </Form.Item>
            <Form.Item name="password" className='w-full relative'>
              <Input.Password
                required
                placeholder='Password'
                iconRender={(visible) => (<div><p className='text-xs !cursor-pointer ff-avenir-bold !text-teal'>{visible ? "HIDE" : "SHOW"}</p></div>)}
                className='w-full p-3 ring-0 focus:ring-teal placeholder:text-gray border-2 border-fade rounded-md'
              />
            </Form.Item>
            <button type='button' className='w-full text-start text-sm font-bold text-teal'>FORGOT PASSWORD?</button>
            <Button
              block
              size='large'
              type='primary'
              htmlType='submit'
              loading={loading}
              className='font-semibold border border-teal !bg-teal text-white hover:!text-white'
            >
              LOG IN
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login