import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const DashboardCard = ({ title, icon, status, dataLength }) => {
  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-lg font-bold'>{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{dataLength}</div>
          <p className='text-xs text-muted-foreground'>
            +{status} from last month
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default DashboardCard
