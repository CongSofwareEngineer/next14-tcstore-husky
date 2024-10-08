import { TYPE_LOADING_GET_DATA } from '@/constant/app'
import useMedia from '@/hook/useMedia'
import React from 'react'
import MySkeleton from '../MySkeleton'
type Props = {
  loading?: boolean
  type: TYPE_LOADING_GET_DATA
}
const LoadingGetData = ({
  type = TYPE_LOADING_GET_DATA.MyBill,
  loading = false,
}: Props) => {
  const { isMobile } = useMedia()

  if (!loading) {
    return <></>
  }

  switch (type) {
    case TYPE_LOADING_GET_DATA.MyBill:
      return isMobile ? (
        <div className="flex flex-col gap-3 w-full mt-3 ">
          <MySkeleton className="w-full h-20  rounded-md" />
          <MySkeleton className="w-full h-20  rounded-md" />
          <MySkeleton className="w-full h-20  rounded-md" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full mt-3 ">
          <MySkeleton className="w-full h-20 rounded-md" />
          <MySkeleton className="w-full h-20 rounded-md" />
          <MySkeleton className="w-full h-20 rounded-md" />
        </div>
      )

    case TYPE_LOADING_GET_DATA.Shop:
      return (
        <div className="gap-4 w-full mt-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2">
          <MySkeleton className="w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square">
            <MySkeleton className="w-[100%] aspect-square " />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
          </MySkeleton>
          <MySkeleton className="w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square">
            <MySkeleton className="w-[100%] aspect-square " />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
          </MySkeleton>
          <MySkeleton className="w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square">
            <MySkeleton className="w-[100%] aspect-square " />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
          </MySkeleton>
          <MySkeleton className="w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square">
            <MySkeleton className="w-[100%] aspect-square " />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
          </MySkeleton>
          {!isMobile && (
            <>
              <MySkeleton className="w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square">
                <MySkeleton className="w-[100%] aspect-square " />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
              </MySkeleton>
              <MySkeleton className="w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square">
                <MySkeleton className="w-[100%] aspect-square " />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
              </MySkeleton>
            </>
          )}
        </div>
      )

    case TYPE_LOADING_GET_DATA.ListProductInHome:
      return (
        <div className="gap-4 w-full mt-4 flex  ">
          <MySkeleton className="w-[250px] items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square">
            <MySkeleton className="w-[100%] aspect-square " />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
          </MySkeleton>
          <MySkeleton className="w-[250px] items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square">
            <MySkeleton className="w-[100%] aspect-square " />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
          </MySkeleton>

          {!isMobile && (
            <>
              <MySkeleton className="w-[250px] items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square">
                <MySkeleton className="w-[100%] aspect-square " />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
              </MySkeleton>
              <MySkeleton className="w-[250px] items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square">
                <MySkeleton className="w-[100%] aspect-square " />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
              </MySkeleton>
            </>
          )}
        </div>
      )

    case TYPE_LOADING_GET_DATA.MyCart:
      return (
        <div className="w-full flex gap-4 h-ful">
          <div className="flex flex-1 flex-col gap-3">
            <MySkeleton className=" w-full rounded-lg h-12" />
            <MySkeleton className="md:p-5 p-3  w-full flex gap-3 rounded-lg ">
              <MySkeleton className="md:w-[150px] w-[100px] h-full rounded-lg" />
              <div className="flex w-full flex-col gap-2">
                <MySkeleton className=" w-full rounded-lg h-12" />
                <MySkeleton className=" w-full rounded-lg h-12" />
                <MySkeleton className=" w-full rounded-lg h-12" />
              </div>
            </MySkeleton>
            <MySkeleton className="md:p-5 p-3  w-full flex gap-3 rounded-lg ">
              <MySkeleton className="md:w-[150px] w-[100px] h-full rounded-lg" />
              <div className="flex w-full flex-col gap-2">
                <MySkeleton className=" w-full rounded-lg h-12" />
                <MySkeleton className=" w-full rounded-lg h-12" />
                <MySkeleton className=" w-full rounded-lg h-12" />
              </div>
            </MySkeleton>
            <MySkeleton className="md:p-5 p-3  w-full flex gap-3 rounded-lg ">
              <MySkeleton className="md:w-[150px] w-[100px] h-full rounded-lg" />
              <div className="flex w-full flex-col gap-2">
                <MySkeleton className=" w-full rounded-lg h-12" />
                <MySkeleton className=" w-full rounded-lg h-12" />
                <MySkeleton className=" w-full rounded-lg h-12" />
              </div>
            </MySkeleton>
          </div>
          <MySkeleton className="lg:w-[300px]   rounded-lg lg:h-[50vh]" />
        </div>
      )
    case TYPE_LOADING_GET_DATA.CommentUser:
      return (
        <div className="flex flex-col gap-2 w-full">
          <MySkeleton className="flex gap-2 w-full md:p-5 p-3">
            <MySkeleton className="md:w-[200px] w-[80px] rounded-lg aspect-square" />
            <div className="flex justify-center flex-1 flex-col gap-2">
              <MySkeleton className="md:min-w-[100px] rounded-lg min-w-full md:h-10 h-5" />
              <MySkeleton className="md:min-w-[100px] rounded-lg min-w-full md:h-7 h-5" />
              <MySkeleton className="md:min-w-[100px] rounded-lg min-w-full md:h-7 h-5" />
            </div>
          </MySkeleton>
        </div>
      )
    default:
      return <></>
  }
}

export default LoadingGetData
