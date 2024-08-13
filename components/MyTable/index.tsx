import React from 'react'
import { Card, Table } from 'antd'
import MyLoadMore from '../MyLoadMore'
type Props = {
  data?: any[]
  columns?: any[]
  limit?: number
  total?: number
  loading?: boolean
  extra?: React.ReactNode
  hasMoreData?: boolean
  isFetchingNextPage?: boolean
  loadMore?: () => any
}
const MyTable = ({
  data = [],
  columns = [],
  loading = false,
  total = 0,
  extra = null,
  hasMoreData = false,
  isFetchingNextPage = false,
  loadMore,
}: Props) => {
  return (
    <Card
      extra={extra}
      title={`Total : ${total || 0}`}
      className="w-full overflow-x-auto  "
    >
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <MyLoadMore
        hasLoadMore={hasMoreData}
        isFetchingNextPage={isFetchingNextPage}
        loading={loading}
        callback={loadMore}
      />
    </Card>
  )
}

export default MyTable
