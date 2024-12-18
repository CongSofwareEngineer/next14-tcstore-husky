import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import { detectImg, formatPrice } from '@/utils/functions'
import React from 'react'
import ModalFeedBack from '../ModalFeedBack'
import { FILTER_BILL } from '@/constant/app'
import { Button } from 'antd'
import MyImage from '@/components/MyImage'
import ConfigBill from '@/components/ConfigBill'
import { TYPE_PRODUCT } from '@/constant/admin'
import useRoutePage from '@/hook/useRoutePage'
type Props = {
  data?: any
}
const ViewDetailBill = ({ data }: Props) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const route = useRoutePage()
  const { openModalDrawer } = useModalDrawer()
  const enableFeedback = data?.status === FILTER_BILL.DeliverySuccess

  const getAddressShip = (item: any) => {
    const address = { ...item.addressShip }
    address.address = address.address.replaceAll('---', ' ')
    return `${address.addressDetail} (${address.address})`
  }

  const handleFeedback = (item: any) => {
    openModalDrawer({
      content: <ModalFeedBack item={data} data={item} />,
      title: translate('feedback.title'),
    })
  }

  const handleRoute = (e: any) => {
    if (e.more_data.category == TYPE_PRODUCT.shoes) {
      route.push(`/shoes/${e.more_data.keyName}`)
    } else {
      route.push(`/shop/${e.more_data.keyName}`)
    }
  }

  return (
    <div className='flex flex-col w-full gap-4'>
      {!isMobile && <p className='text-[22px] mb-2 font-bold text-center'>{translate('textPopular.viewDetail')}</p>}
      {isMobile && (
        <div className='flex gap-1'>
          <div className='whitespace-nowrap'>{translate('textPopular.address')}</div>
          <div>:</div>
          <div>{getAddressShip(data)}</div>
        </div>
      )}
      {data && (
        <div className='flex flex-col gap-4 w-full'>
          {[...data?.listBill, ...data?.listBill]?.map((e: any) => {
            return (
              <div key={e._id} className={`flex gap-3 w-full pb-4 border-b-[2px] border-gray-200`}>
                <div className='aspect-square w-[100px]  flex justify-center align-middle  relative rounded-md overflow-hidden'>
                  <MyImage
                    alt={`icon-product-bill-${e._id}`}
                    src={detectImg(e.more_data.imageMain)}
                    className='!relative !w-full !h-auto'
                  />
                </div>
                <div className='flex flex-col md:gap-2 gap-1'>
                  <p onClick={() => handleRoute(e)} className='font-bold'>
                    {e.more_data.name}
                  </p>
                  <div>{`${translate('textPopular.amount')} : x${e.amount}`}</div>
                  <ConfigBill item={e} />
                  <div className='text-green-700 font-bold'>
                    <span className='mr-1'>{translate('productDetail.price')} :</span>
                    <span>{formatPrice(e.more_data.price)} VNĐ</span>
                  </div>
                  <div className='flex gap-2 items-center'>
                    {enableFeedback && (
                      <Button type='primary' onClick={() => handleFeedback(e)} size='small' className='w-max'>
                        {translate('common.feedback')}
                      </Button>
                    )}
                    {data?.status !== FILTER_BILL.Processing && (
                      <Button onClick={() => handleRoute(e)} size='small' className='w-max'>
                        {translate('common.buyAgain')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <div className='text-medium gap-1 flex w-full justify-end font-bold text-green-500 '>
        <span>{translate('textPopular.totalMoney')} : </span>
        <span>{`${formatPrice(data.totalBill || '0')} VNĐ`}</span>
      </div>
    </div>
  )
}

export default ViewDetailBill
