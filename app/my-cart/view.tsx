'use client'
import BtnBack from '@/components/BtnBack'
import useMyCart from '@/hook/tank-query/useMyCart'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import { useEffect, useState } from 'react'
import { PageSizeLimit } from '@/constant/app'
import { cloneData, numberWithCommas } from '@/utils/functions'
import PrimaryButton from '@/components/PrimaryButton'
import ListItemCart from './Component/ListItemCart'
import Payment from './Component/Payment'

const MyCartScreen = () => {
  const { data, isLoading, refreshData } = useMyCart(PageSizeLimit)
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const [listCartFormat, setListCartFormat] = useState<any[]>([])
  const [isPayment, setIsPayment] = useState(false)
  const [allSelected, setAllSelected] = useState(false)

  useEffect(() => {
    if (data) {
      setListCartFormat((e) => {
        const arr = data.map((eChil: any) => {
          const item = e.find((item) => item.id === eChil.id)
          if (item) {
            return item
          }
          return { ...e, selected: false }
        })
        return arr
      })
    }
  }, [data])

  const calculatePayment = () => {
    let total = 0
    listCartFormat.forEach((e: any) => {
      if (e.selected) {
        total += e.price * e.amount
      }
    })
    return `${numberWithCommas(total)} VNĐ`
  }
  const calculateItemPayment = () => {
    let total = 0
    listCartFormat.forEach((e: any) => {
      if (e.selected) {
        total++
      }
    })
    return total
  }

  const handleSelect = (item: any, index?: number) => {
    const dataClone = cloneData(listCartFormat)
    dataClone[Number(index)] = item
    setListCartFormat(dataClone)
  }

  const handleDelete = (index: number) => {
    let dataClone = cloneData(listCartFormat)
    dataClone = dataClone.filter(
      (_: any, indexFilter: number) => indexFilter !== index
    )
    setListCartFormat(dataClone)
  }

  const handlePayment = () => {
    setIsPayment(true)
    // openModalDrawer({
    //   content: (
    //     <ModalPayment callBack={refreshData} dataCart={listCartFormat} />
    //   ),
    //   useDrawer: true,
    //   title: translate('bill.infoDelivery'),
    //   configModal: {
    //     width: '760px',
    //     height: '90vh',
    //     showHeader: true,
    //   },
    //   configDrawer: {
    //     height: '95%',
    //     placement: 'bottom',
    //   },
    // })
  }

  const handleSelectAll = (isSelect = false) => {
    let dataClone = cloneData(listCartFormat)
    dataClone = dataClone.map((e: any) => {
      return {
        ...e,
        selected: isSelect,
      }
    })
    setListCartFormat(dataClone)
    setAllSelected(isSelect)
  }

  const renderDesktop = () => {
    return (
      <div className="w-full">
        <BtnBack
          title={[translate('header.shop'), translate('header.cart')]}
          url={['/shop']}
        />
        <div className="w-full flex gap-5">
          <div
            style={{ boxShadow: '3px 3px 6px rgba(0,0,0,.0509803922)' }}
            className="flex-1  border-2 border-gray-300  overflow-y-auto bg-white"
          >
            <ListItemCart
              allSelected={allSelected}
              dataCart={listCartFormat}
              callBackClick={handleSelect}
              callBackDelete={handleDelete}
              callBackSelectAll={handleSelectAll}
              loading={isLoading}
            />
          </div>
          <div className="w-[300px] border-2 border-gray-300 bg-white flex flex-col items-center h-fit p-3 gap-3">
            <div className="w-full flex justify-between">
              <div>{translate('textPopular.provisional')}</div>
              <span className="font-bold text-green-500">
                {calculatePayment()}
              </span>
            </div>
            <div className="border-[1px] border-gray-300 w-full" />
            <PrimaryButton onClick={handlePayment}>
              {`${translate('cart.payment')} (${calculateItemPayment()})`}
            </PrimaryButton>
          </div>
        </div>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div>
        <div
          style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
          className=" flex-1  border-[.5px] border-gray-300 bg-white  overflow-y-auto"
        >
          <ListItemCart
            allSelected={allSelected}
            dataCart={listCartFormat}
            callBackClick={handleSelect}
            callBackDelete={handleDelete}
            callBackSelectAll={handleSelectAll}
            loading={isLoading}
          />
        </div>
        <div className="fixed z-[2] w-full bg-white border-gray-300 p-[20px] bottom-0 left-0">
          <div className="relative flex flex-col gap-2">
            <div className="flex gap-2 w-full">
              <div className="font-semibold">
                {translate('textPopular.totalMoney')} :
              </div>
              <span className="font-bold text-green-700">
                {calculatePayment()}
              </span>
            </div>
            <div className="w-full border-[1px] border-gray-200  relative  " />

            <PrimaryButton onClick={handlePayment}>
              {`${translate('cart.payment')} (${calculateItemPayment()})`}
            </PrimaryButton>
          </div>
        </div>
      </div>
    )
  }

  return isPayment ? (
    <Payment
      refreshData={refreshData}
      clickBack={() => setIsPayment(false)}
      dataCart={listCartFormat}
    />
  ) : isMobile ? (
    renderMobile()
  ) : (
    renderDesktop()
  )
}

export default MyCartScreen
