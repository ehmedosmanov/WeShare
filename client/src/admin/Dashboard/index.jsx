import React, { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { User, BookImage } from 'lucide-react'
import { useGetMe, useGetUsers } from '@/hooks/UsersHooks'
import moment from 'moment'
import { useGetAllPosts } from '@/hooks/PostHooks'
import { Skeleton } from '@/components/ui/skeleton'
import DashboardCard from './DashboardCard'
const Dashboard = () => {
  const { data: userData, isLoading: userLoading } = useGetUsers()
  const [userStatus, setUserStatus] = useState(null)
  const [postStatus, setPostStatus] = useState(null)
  const { data: posts, isLoading: postLoading } = useGetAllPosts()
  const [userChartData, setUserChartData] = useState(null)
  const [postChartData, setPostChartData] = useState([])
  const { data: current } = useGetMe()
  useEffect(() => {
    if (userData) {
      const tempData = userData.reduce((acc, user) => {
        const month = moment(user.createdAt).format('MMM')
        if (!acc[month]) {
          acc[month] = { name: month, total: 0 }
        }
        acc[month].total += 1
        return acc
      }, {})
      setUserChartData(Object.values(tempData))
    }
  }, [userData])

  useEffect(() => {
    if (posts) {
      const tempData = userData.reduce((acc, post) => {
        const month = moment(post.createdAt).format('MMM')
        if (!acc[month]) {
          acc[month] = { name: month, total: 0 }
        }
        acc[month].total += 1
        return acc
      }, {})
      setPostChartData(Object.values(tempData))
    }
  }, [posts])

  useEffect(() => {
    if (userData) {
      const startDate = moment().startOf('month').subtract(1, 'months')
      const endDate = moment().endOf('month').subtract(1, 'months')
      const filteredUsers = userData.filter(user =>
        moment(user.createdAt).isBetween(startDate, endDate, null, '[]')
      )
      setUserStatus(filteredUsers.length)
    }
  }, [userData])

  useEffect(() => {
    if (posts) {
      const startDate = moment().startOf('month').subtract(1, 'months')
      const endDate = moment().endOf('month').subtract(1, 'months')
      const filteredPosts = posts.filter(post =>
        moment(post.createdAt).isBetween(startDate, endDate, null, '[]')
      )
      setPostStatus(filteredPosts.length)
    }
  }, [posts])

  return (
    <div className=' mt-10  w-full flex gap-y-6 justify-between flex-col'>
      <h5 className='text-3xl h-full font-bold mb-8'>
        Hi, Welcome back {current?.username} 👋
      </h5>
      <div className='grid gap-4 w-full border-b pb-6 border-b-background md:grid-cols-2 lg:grid-cols-2'>
        {userLoading ? (
          <DashboardCardSkeleton />
        ) : (
          <DashboardCard
            title={'Users'}
            icon={<User />}
            dataLength={userData?.length}
            status={userStatus}
          />
        )}

        {postLoading ? (
          <DashboardCardSkeleton />
        ) : (
          <DashboardCard
            title={'Posts'}
            icon={<BookImage />}
            dataLength={posts?.length}
            status={postStatus}
          />
        )}
      </div>
      <div className='grid grid-cols-2 gap-4 mb-8'>
        <Card className='pt-8 grid grid-cols-1'>
          <CardTitle>
            <h4 className='font-bold mb-8 ml-8'>Users</h4>
          </CardTitle>
          <CardContent>
            <ResponsiveContainer width='100%' height={350}>
              <BarChart data={userChartData}>
                <XAxis
                  dataKey='name'
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[1, 'dataMax']}
                  scale='log'
                  type='number'
                />
                <Bar dataKey='total' fill='#fff' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className='pt-8 grid grid-cols-1'>
          <CardTitle>
            <h4 className='font-bold mb-8 ml-8'>Users</h4>
          </CardTitle>
          <CardContent>
            <ResponsiveContainer width='100%' height={350}>
              <BarChart data={postChartData}>
                <XAxis
                  dataKey='name'
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[1, 'dataMax']}
                  scale='log'
                  type='number'
                />
                <Bar dataKey='total' fill='#fff' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className='pl-2'></CardContent>
          </Card>
          <Card className='col-span-4 md:col-span-3'>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}

export default Dashboard

export const DashboardCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-lg font-bold'>Users</CardTitle>
        <User />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          <Skeleton className={'w-8 h-6 mb-1'} />
        </div>
        <p className='text-xs text-muted-foreground'>
          <Skeleton className={'w-[78px] h-3'} />
        </p>
      </CardContent>
    </Card>
  )
}
