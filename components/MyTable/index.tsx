import React from 'react'
import { Card, Table } from 'antd'
import MyLoadMore from '../MyLoadMore'
import styled from 'styled-components'
const CardCustom = styled(Card)`
  @media screen and (max-width: 768px) {
    .ant-card-body {
      padding: 10px !important;
    }
  }
`
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
  classCard?: string
  className?: string
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
  classCard = '',
  className = '',
}: Props) => {
  return (
    <CardCustom extra={extra} title={`Total : ${total || 0}`} className={`w-full overflow-x-auto  ${classCard}`}>
      <Table loading={loading} columns={columns} dataSource={data} pagination={false} className={className} />
      <MyLoadMore
        hasLoadMore={hasMoreData}
        isFetchingNextPage={isFetchingNextPage}
        loading={loading}
        callback={loadMore}
      />
    </CardCustom>
  )
}

export default MyTable
