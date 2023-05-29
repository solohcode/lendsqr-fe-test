import React, { ReactElement, useState } from 'react';
import { Avatar, Card, Divider, Rate } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import Layout from '../../components/layout';
import useGetSingleUser from '../../hooks/useGetSingleUser';
import { formatNumber, textInclude } from '../..';
import Error from '../404/Error';

function User() {
  const {id} = useParams()
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details")

  // fetch user details query call
  const {isLoading, isError, data } = useGetSingleUser(id!)

  // tabs menu items 
  const tabItem = [
    {
      key: 'details',
      label: "General Details",
    },
    {
      key: 'documents',
      label: "Documents",
    },
    {
      key: 'bank',
      label: "Bank Details",
    },
    {
      key: 'loans',
      label: "Loans",
    },
    {
      key: 'savings',
      label: "Savings",  
    },
    {
      key: 'app',
      label: "App and System",
    },
  ];

  const TitleHeader = ({children, title, className} : {children: ReactElement[], title?: string, className?: string}) => (
    <div className='text-gray space-y-5'>
      <p className='text-blue text-lg font-medium'>{title}</p>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-5 md:gap-y-8 lg:gap-x-10 ${className}`}>
        {children}
      </div>
    </div>
  )

  const DataText = ({label, value} : {label: string, value: string}) => (
    <div className='w-full truncate'>
      <p className='uppercase'>{label}</p>
      <p className='text-base font-medium'>{value}</p>
    </div>
  )

  // if the query call returns an error display error page 
  if(isError) return <Error />
  return (
    <Layout>
      <div className='w-full !space-y-5'>
        <button onClick={() => navigate(-1)} className='w-full flex items-center space-x-2 text-gray'>
          <HiOutlineArrowNarrowLeft />
          <p>Back to Users</p>
        </button>
        <div className='md:flex justify-between items-center space-y-3 md:space-y-0'>
          <p className='text-2xl text-blue font-medium'>User Details</p>
          <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3'>
            <button disabled={isLoading} className='uppercase font-semibold rounded-lg border border-error text-error hover:bg-error hover:text-white py-2 px-3'>Blacklist User</button>
            <button disabled={isLoading} className='uppercase font-semibold rounded-lg border border-success text-success hover:bg-success hover:text-white py-2 px-3'>Activate User</button>
          </div>
        </div>
        <Card loading={isLoading} className='w-full h-full shadow-sm !rounded-none'>
          <div className='space-y-10'>
            <div className='w-full h-full flex flex-col md:flex-row text-center md:text-start items-center space-y-5 md:space-y-0 md:space-x-5 lg:space-x-10'>
              <Avatar src={data?.profile?.avatar} icon={<AiOutlineUser />} shape='circle' size={100} />
              <div className='text-gray'>
                <p className='text-blue font-semibold capitalize text-xl'>{data?.profile?.firstName} {data?.profile?.lastName}</p>
                <p>{data?.userName}</p>
              </div>
              <Divider type='vertical' className='hidden md:block' />
              <div className='text-gray'>
                <p className='font-medium capitalize'>User's Tier</p>
                <Rate count={3} disabled defaultValue={1} />
              </div>
              <Divider type='vertical'  className='hidden md:block' />
              <div className='text-gray'>
                <p className='text-blue font-medium capitalize text-xl'>₦{formatNumber(data?.accountBalance)}</p>
                <p>{data?.accountNumber}/{data?.bank || "Providus Bank"}</p>
              </div>
            </div>
            <div className='w-full inline-flex md:!flex overflow-x-auto md:overflow-x-hidden !justify-between !items-center'>
              {tabItem.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`!min-w-[150px] md:w-full pb-3 font-medium ${textInclude(activeTab, tab.key) && "border-b border-teal text-teal"} hover:border-b hover:border-teal hover:text-teal`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Card>
        <Card loading={isLoading} className='w-full h-full shadow-sm !rounded-none'>
          <div className='space-y-10'>
            <TitleHeader title='Personal Information'>
              <DataText label='Full Name' value={`${data?.profile?.firstName} ${data?.profile?.lastName}`} />
              <DataText label='Phone Number' value={data?.phoneNumber} />
              <DataText label='Email Address' value={data?.email} />
              <DataText label='bvn' value={data?.profile?.bvn} />
              <DataText label='Gender' value={data?.profile?.gender} />
              <DataText label='Marital status' value={data?.profile?.maritalStatus || "Single"} />
              <DataText label='Children' value={data?.profile?.children || "None"} />
              <DataText label='Type of residence' value={data?.profile?.residence || "Parent's Apartment"} />
            </TitleHeader>
            <Divider />
            <TitleHeader title='Education and Employment' className='lg:!grid-cols-4'>
              <DataText label='level of education' value={data?.education?.level} />
              <DataText label='employment status' value={data?.education?.employmentStatus} />
              <DataText label='sector of employment' value={data?.education?.sector} />
              <DataText label='Duration of employment' value={data?.education?.duration} />
              <DataText label='office email' value={data?.education?.officeEmail} />
              <DataText label='Monthly income' value={`₦${formatNumber(data?.education?.monthlyIncome?.[0])} - ₦${formatNumber(data?.education?.monthlyIncome?.[1])}`} />
              <DataText label='loan repayment' value={`₦${formatNumber(data?.education?.loanRepayment)}`} />
            </TitleHeader>
            <Divider />
            <TitleHeader title='Socials'>
              <DataText label='Twitter' value={data?.socials?.twitter} />
              <DataText label='Facebook' value={data?.socials?.facebook} />
              <DataText label='Instagram' value={data?.socials?.instagram} />
            </TitleHeader>
            <Divider />
            <TitleHeader title='Guarantor' className='lg:!grid-cols-4'>
              <DataText label='Full Name' value={`${data?.guarantor?.firstName} ${data?.guarantor?.lastName}`} />
              <DataText label='Phone Number' value={data?.guarantor?.phoneNumber} />
              <DataText label='Email Address' value={data?.email} />
              <DataText label='Relationship' value={data?.guarantor?.relationship || "Sister"} />
            </TitleHeader>
            <Divider />
            <TitleHeader className='lg:!grid-cols-4'>
              <DataText label='Full Name' value={`${data?.guarantor?.firstName} ${data?.guarantor?.lastName}`} />
              <DataText label='Phone Number' value={data?.guarantor?.phoneNumber} />
              <DataText label='Email Address' value={data?.email} />
              <DataText label='Relationship' value={data?.guarantor?.relationship || "Sister"} />
            </TitleHeader>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default User