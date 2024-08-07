import MyTable from '@/components/MyTable'
import PrimaryButton from '@/components/PrimaryButton'
import TextCopy from '@/components/TextCopy'
import { FILTER_BILL, PAGE_SIZE_LIMIT, REQUEST_TYPE } from '@/constant/app'
import useBillAdmin from '@/hook/tank-query/Admin/useBillAdmin'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import {
  formatDateTime,
  formatPrice,
  showNotificationError,
  showNotificationSuccess,
} from '@/utils/functions'
import { Button } from 'antd'
import React from 'react'
import ItemDetail from './Components/Itemdetail'
import ModalDelete from '@/components/ModalDelete'
import ServerApi from '@/services/serverApi'
import useLanguage from '@/hook/useLanguage'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'

const BillAdminScreen = () => {
  const { renderContent } = useSearchBaseAdmin()
  const { data, isLoading } = useBillAdmin([], '')
  const { isMobile } = useMedia()
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()
  const { refreshQuery } = useRefreshQuery()

  const getAmountBuy = (item: any) => {
    let amount = 0
    item.listBill.forEach((e: any) => {
      amount += e.amount
    })
    return amount
  }

  const handleSubmit = (item: any, status: FILTER_BILL) => {
    const callBack = async () => {
      const res = await ServerApi.requestBase({
        url: `bill/update/${item._id}`,
        body: {
          status: status,
        },
        method: REQUEST_TYPE.POST,
      })

      if (res?.data) {
        showNotificationSuccess(translate('myPage.updateSuccess'))
        refreshQuery(QUERY_KEY.BillAdmin)
      } else {
        showNotificationError(translate('textPopular.updateFailed'))
      }
      closeModalDrawer()
    }
    openModalDrawer({
      content: <ModalDelete title="Do you Delivery Bill" callback={callBack} />,
    })
  }

  const handleViewDetail = (item: any) => {
    openModalDrawer({
      content: <ItemDetail data={item} />,
      useDrawer: true,
      configDrawer: {
        placement: 'bottom',
        title: (
          <p className="text-center text-medium font-bold ">Bill detail</p>
        ),
        height: 'fit-content',
      },
    })
  }

  const renderStatus = (status: string) => {
    switch (status) {
      case FILTER_BILL.Processing:
        return <span className="text-blue-700 font-bold">Processing</span>
      case FILTER_BILL.Delivering:
        return <span className="text-green-500 font-bold">Delivering</span>

      case FILTER_BILL.Canceled:
        return <span className="text-red-500 font-bold">Canceled</span>

      default:
        return (
          <span className="text-green-500 font-bold">Delivery success</span>
        )
    }
  }

  const columns = [
    {
      title: '_id',
      key: '_id',
      dataIndex: '_id',
      render: (_: any, record: any) => {
        return (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-bold">Date: </span>
              <span className="text-nowrap">
                {formatDateTime(parseInt(record?.date))}
              </span>{' '}
            </div>
            <div className="flex gap-2">
              <span className="font-bold">ID: </span>
              <TextCopy textView={record._id} />
            </div>
            <div className="flex gap-2">
              <span className="font-bold">sdt: </span>
              <TextCopy textView={record.sdt} />
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Amount: </span>
              <span>{getAmountBuy(record)}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">status: </span>
              {renderStatus(record.status)}
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Total: </span>
              <span className="text-green-500 font-bold">
                {formatPrice(record?.totalBill || '0')}
              </span>
            </div>

            <div className="flex gap-5 md:flex-row">
              {record?.status === FILTER_BILL.Processing && (
                <PrimaryButton
                  onClick={() => handleSubmit(record, FILTER_BILL.Delivering)}
                  widthBtn={isMobile ? '100%' : '150px'}
                >
                  Delivering
                </PrimaryButton>
              )}
              {record?.status === FILTER_BILL.Delivering && (
                <PrimaryButton
                  onClick={() =>
                    handleSubmit(record, FILTER_BILL.DeliverySuccess)
                  }
                  widthBtn={isMobile ? '100%' : '150px'}
                >
                  Delivery success
                </PrimaryButton>
              )}
              <div className="flex md:flex-auto flex-1">
                <Button onClick={() => handleViewDetail(record)} type="primary">
                  View Detail
                </Button>
              </div>
            </div>
          </div>
        )
      },
    },
  ]
  return (
    <div className="flex flex-col gap-3 w-full">
      {renderContent()}
      <MyTable
        columns={columns}
        loading={isLoading}
        data={data || []}
        limit={PAGE_SIZE_LIMIT}
        total={20}
      />
    </div>
  )
}

export default BillAdminScreen
