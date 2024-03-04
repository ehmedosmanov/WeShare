import React from 'react'
import Heading from '../Heading'
import { DataTable } from '../DataTable'
import { columns } from './columns'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
const TableView = ({ data }) => {
  return (
    <>
      <div className='flex mb-4 items-center justify-between'>
        <Heading
          title={`Users (${data?.length})`}
          description='Manage users (Client side table functionalities.)'
        />
        <Link to={'/Admin/Users/NewUser'}>
          <Button>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </Link>
      </div>
      {/* <Separator /> */}
      <DataTable searchKey='username' columns={columns} data={data} />
    </>
  )
}

export default TableView
