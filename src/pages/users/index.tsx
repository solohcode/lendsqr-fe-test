/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { DatePicker, Dropdown, Form, FormInstance, Input, MenuProps, Select, Table, TableColumnsType, Tag, Tooltip } from 'antd';
import { BsFilter } from 'react-icons/bs';
import { compareAsc } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout';
import StatCard from '../../components/shared/StatCard';
import useGetAllUsers from '../../hooks/useGetUsers';
import { formatNumber, textInclude } from '../..';
import { DataType, FilterParam, StatType } from './types';
import user from "../../assets/icons/user_stat.png"
import active from "../../assets/icons/active_stat.png"
import loan from "../../assets/icons/loan_stat.png"
import saving from "../../assets/icons/saving_stat.png"
import view from "../../assets/icons/view.png"
import blacklist from "../../assets/icons/blacklist.png"
import activate from "../../assets/icons/activate.png"
import menu from "../../assets/icons/menu.png"
import moment from 'moment';
import Error from '../404/Error';

function Users() {
  const navigate = useNavigate();
  const [form]: FormInstance[] = Form.useForm()
  const [pageSize, setPageSize] = useState(10)
  const [filterPop, setFilterPop] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  // fetch all users query call
  const {isLoading, isError, data } = useGetAllUsers()

  // set data to filtered data state 
  useMemo(() => setFilteredData(data), [data])
  
  // filter data and set it to filtered data state 
  const handleFilter = (value: FilterParam) => {
    console.log(value, Object.values(value).some(val => val))
    const filterData = data?.filter((user: DataType) =>
    Object.values(value).some(val => val) ? (
      textInclude(user?.email, value?.email!)
      || textInclude(user?.status, value?.status!)
      || textInclude(user?.orgName, value?.org_name!)
      || textInclude(user?.userName, value?.user_name!)
      || textInclude(user?.phoneNumber, value?.phone_no!)
      || !compareAsc(new Date(user?.createdAt || new Date()), new Date(value?.date! || new Date()))
    ) : user
    )
    setFilteredData(filterData);
  }

  // reset form function 
  const formReset = () => {form.resetFields(); setFilteredData(data)};

  // statistic cards array 
  const stats: StatType[] = useMemo(() => 
    [
      {
        icon: user,
        title: "users",
        stat: formatNumber(data?.length),
      },
      {
        icon: active,
        title: "Active Users",
        stat: formatNumber(data?.length),
      },
      {
        icon: loan,
        title: "Users with Loans",
        stat: formatNumber(data?.filter((user: DataType) => Number(user?.education?.loanRepayment) || Object.values(user?.guarantor).every((d => d))).length),
      },
      {
        icon: saving,
        title: "Users with Savings",
        stat: formatNumber(data?.filter((user: DataType) => Number(user?.accountBalance)).length),
      },
    ]
  , [data]) 

  // menu dropdown items 
  const items: MenuProps['items'] = [
    {
      key: 'view',
      icon: <img alt='view' src={view} />,
      label: <p>View Details</p>,
    },
    {
      key: 'blacklist',
      icon: <img alt='view' src={blacklist} />,
      label: <p>Blacklist User</p>,
    },
    {
      key: 'activate',
      icon: <img alt='view' src={activate} />,
      label: <p>Activate User</p>,
    },
  ];

  // handle drop down menu selection for each table row 
  // if key includes view navigate to user page
  const handleDrop = (key: string, id: string) => {if(textInclude(key, "view")){navigate(`/user/${id}`)}}

  // table columns 
  const TableTitle = ({title}: {title: string}) => <Tooltip title={`${filterPop ? "close" : "open"} filter modal`} ><div onClick={() => setFilterPop(!filterPop)} className='uppercase text-gray flex items-center space-x-2 cursor-pointer'><p>{title}</p><BsFilter size={20} /></div></Tooltip>
  const columns: TableColumnsType<DataType> = [
    {
      title: <TableTitle title='organization' />,
      key: "orgName",
      width: 200,
      dataIndex: "orgName",
    },
    {
      title: <TableTitle title='username' />,
      key: "userName",
      width: 160,
      dataIndex: "userName",
    },
    {
      title: <TableTitle title='email' />,
      key: "email",
      dataIndex: "email",
      width: 280,
    },
    {
      title: <TableTitle title='phone number' />,
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      width: 200,
    },
    {
      title: <TableTitle title='date joined' />,
      key: "createdAt",
      dataIndex: "createdAt",
      width: 200,
      render: (value) => moment(value).format('lll')
    },
    {
      title: <TableTitle title='status' />,
      key: "status",
      dataIndex: "status",
      width: 150,
      render: (status) => <div className='capitalize'>
        {/* assume there's a status key in the data given  */}
        {
          textInclude(status, "inactive") ?
          <Tag bordered={false} className='text-sm rounded-2xl px-4 py-1 text-gray'>Inactive</Tag> :
          textInclude(status, "blacklisted") ?
          <Tag bordered={false} className='text-sm rounded-2xl px-4 py-1 text-error' color="red">Blacklisted</Tag> :
          textInclude(status, "active") ?
          <Tag bordered={false} className='text-sm rounded-2xl px-4 py-1 text-success' color="green">Active</Tag> :
          <Tag bordered={false} className='text-sm rounded-2xl px-4 py-1 text-warn' color="gold">Pending</Tag>
        }
      </div>
    },
    {
      key: "id",
      dataIndex: "id",
      fixed: "right",
      width: 50,
      render: (id) => <Dropdown menu={{ items, onClick: ({key}) => handleDrop(key, id) }} trigger={['click']}><img alt='menu' src={menu} className='cursor-pointer' /></Dropdown>
    },
  ]

  // if the query call returns an error display error page 
  if(isError) return <Error />
  return (
    <Layout>
      <div className='w-full space-y-10'>
        <div className='text-2xl text-blue font-medium'>
          Users
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5'>
          {stats.map((stat) => (
            <StatCard
              {...stat}
              key={stat.title}
              loading={isLoading}
            />
          ))}
        </div>
        <div>
          <div className='w-full relative text-gray'>
            <Table
              key="id"
              rowKey="id"
              columns={columns}
              loading={isLoading}
              scroll={{ x: 1000 }}
              dataSource={filteredData}
              className='relative !text-gray'
              footer={() => <div className='sm:absolute bottom-0 left-0 text-gray flex items-center space-x-2'>
                <p>Showing</p>
                <Select value={pageSize} size='small' onChange={setPageSize}>
                  <Select.Option value={10}>10</Select.Option>
                  <Select.Option value={20}>20</Select.Option>
                  <Select.Option value={40}>40</Select.Option>
                  <Select.Option value={60}>60</Select.Option>
                  <Select.Option value={80}>80</Select.Option>
                  <Select.Option value={100}>100</Select.Option>
                </Select>
                <p>out of {data?.length}</p>
              </div>}
              pagination={{
                pageSize,
                size: "small",
                responsive: true,
                showLessItems: true,
                showSizeChanger: false,
                className: "bg-shade !text-gray",
              }}
            />
            <Form layout='vertical' form={form} onFinish={handleFilter} className={`w-full sm:w-[250px] ${!filterPop && "hidden"} z-10 absolute top-14 left-0 bg-white space-y-2.5 shadow-md border border-fade rounded px-5 py-10`}>
              <Form.Item name="org_name" label={<p className='text-gray font-medium'>Organization</p>}>
                <Select size='large' placeholder="Select" className='m-0' options={[
                  {label: "Organization Name", value: "organization"}
                ]} />
              </Form.Item>
              <Form.Item name="user_name" label={<p className='text-gray font-medium'>Username</p>}>
                <Input className='rounded-lg border-outline' size='large' placeholder="User" />
              </Form.Item>
              <Form.Item name="email" label={<p className='text-gray font-medium'>Email</p>}>
                <Input type='email' className='rounded-lg border-outline' size='large' placeholder="Email" />
              </Form.Item>
              <Form.Item name="date" label={<p className='text-gray font-medium'>Date</p>}>
                <DatePicker className='w-full rounded-lg border-outline' size='large' placeholder="Date" />
              </Form.Item>
              <Form.Item name="phone_no" label={<p className='text-gray font-medium'>Phone Number</p>}>
                <Input type='tel' className='rounded-lg border-outline' size='large' placeholder="Phone Number" />
              </Form.Item>
              <Form.Item name="status" label={<p className='text-gray font-medium'>Status</p>}>
                <Select size='large' placeholder="Select" options={[
                  {label: "active", value: "active"},
                  {label: "inactive", value: "inactive"},
                  {label: "pending", value: "pending"},
                  {label: "blacklisted", value: "pending"}
                ]} />
              </Form.Item>
              <div className='w-full grid grid-cols-2 gap-3 pt-5'>
                <button type='button' onClick={formReset} className='p-3 text-sm font-bold border border-gray text-gray hover:bg-gray hover:text-white rounded-lg'>Reset</button>
                <button type='submit' className='p-3 text-sm font-bold border border-teal bg-teal text-white hover:opacity-90 rounded-lg'>Filter</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users