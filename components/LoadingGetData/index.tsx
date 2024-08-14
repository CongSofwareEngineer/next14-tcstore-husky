import { TYPE_LOADING_GET_DATA } from '@/constant/app'
import useMedia from '@/hook/useMedia'
import React from 'react'
type Props = {
  loading?: boolean
  type: TYPE_LOADING_GET_DATA
}
const LoadingGetData = ({
  type = TYPE_LOADING_GET_DATA.MyBill,
  loading = false,
}: Props) => {
  const { isMobile } = useMedia()

  const component = () => {
    if (!loading) {
      return <></>
    }

    switch (type) {
      case TYPE_LOADING_GET_DATA.MyBill:
        return isMobile ? (
          <div className="flex flex-col gap-3 w-full mt-3 ">
            <div className="w-full h-20 skeleton-loading rounded-md" />
            <div className="w-full h-20 skeleton-loading rounded-md" />
            <div className="w-full h-20 skeleton-loading rounded-md" />
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full mt-3 ">
            <div className="w-full h-20 skeleton-loading rounded-md" />
            <div className="w-full h-20 skeleton-loading rounded-md" />
            <div className="w-full h-20 skeleton-loading rounded-md" />
          </div>
        )

      case TYPE_LOADING_GET_DATA.Shop:
        return (
          <div className="gap-3 grid md:grid-cols-3 grid-cols-2">
            <div className="w-full skeleton-loading rounded-lg aspect-square" />
            <div className="w-full skeleton-loading rounded-lg aspect-square" />
            <div className="w-full skeleton-loading rounded-lg aspect-square" />
            <div className="w-full skeleton-loading rounded-lg aspect-square" />
            <div className="w-full skeleton-loading rounded-lg aspect-square" />
            <div className="w-full skeleton-loading rounded-lg aspect-square" />
          </div>
        )

      case TYPE_LOADING_GET_DATA.ListProductInHome:
        return (
          <div className="w-full flex gap-3">
            <div className="skeleton-loading sm:w-[30%] w-[48%] md:pb-[300px] pb-[150px] rounded-lg" />
            <div className="skeleton-loading sm:w-[30%] w-[48%] md:pb-[300px] pb-[150px] rounded-lg" />
            {!isMobile && (
              <div className="skeleton-loading w-[30%] md:pb-[300px] pb-[150px] rounded-lg" />
            )}
          </div>
        )

      case TYPE_LOADING_GET_DATA.MyCart:
        return (
          <div className="w-full flex gap-4 h-ful">
            <div className="flex flex-1 flex-col gap-3">
              <div className="skeleton-loading w-full rounded-lg h-12" />
              <div className="skeleton-loading w-full rounded-lg h-[30vh]" />
              <div className="skeleton-loading w-full rounded-lg h-[30vh]" />
            </div>
            <div className="lg:w-[300px] skeleton-loading rounded-lg lg:h-[50vh]" />
          </div>
        )

      default:
        return <></>
    }
  }

  return component()
}

export default LoadingGetData
