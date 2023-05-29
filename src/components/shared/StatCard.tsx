import { Card } from 'antd'
import React from 'react'

type Props = {
  loading?: boolean,
  icon?: string | any,
  title: string,
  stat: number | string,
}
function StatCard({
  loading,
  title,
  icon,
  stat
}: Props) {
  return (
    <Card loading={loading} className='shadow-lg flex flex-col justify-between'>
      <img alt={title} src={icon} className='block' />
      <p className='uppercase text-gray mt-2'>{title}</p>
      <p className='text-2xl text-blue font-semibold'>{stat}</p>
    </Card>
  )
}

export default StatCard