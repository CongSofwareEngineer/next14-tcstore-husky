import ImageAdmin from '@/components/ImageAdmin'
import { ItemDetailType } from '@/components/InfoItemDetail/type'
import LoadingGetData from '@/components/LoadingGetData'
import MyLoadMore from '@/components/MyLoadMore'
import { images } from '@/configs/images'
import { TYPE_LOADING_GET_DATA } from '@/constant/app'
import useComment from '@/hook/tank-query/useComment'
import { detectImg, ellipsisText } from '@/utils/functions'
import { Rate } from 'antd'
import React from 'react'

const ListComment = ({ dataItem }: { dataItem: ItemDetailType }) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, loadMore } =
    useComment(dataItem?._id)

  return (
    <div className="flex flex-col gap-2">
      <div className="text-medium font-bold">Bình luận</div>

      {isLoading ? (
        <LoadingGetData
          type={TYPE_LOADING_GET_DATA.CommentUser}
          loading={isLoading}
        />
      ) : (
        <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
          {[...data, ...data].map((e) => {
            return (
              <div
                key={e.sdt}
                className="flex gap-4 pb-3 border-b-[1px] mt-1 border-b-gray-200"
              >
                <div className="aspect-square h-fit rounded-lg relative overflow-hidden w-[20%] md:min-w-[80px] min-w-[50px]  max-w-[100px]">
                  <ImageAdmin
                    src={e.user[0]?.avatar}
                    alt={e.sdt}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">{e.name}</p>
                  <div className="text-[10px]">{`SĐT : ${ellipsisText(
                    e.sdt,
                    4,
                    3
                  )}`}</div>
                  <Rate disabled value={e.rate} style={{ fontSize: 15 }} />
                  <div className="my-1">{e.note}</div>
                  <div className="flex flex-wrap w-full gap-2 mt-1 ">
                    {e.listImg.map((img: string) => {
                      return (
                        <div className="md:w-[50px] w-[30px] aspect-square relative overflow-hidden ">
                          <ImageAdmin src={img} alt={img} className="w-full" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}

          <MyLoadMore
            hasLoadMore={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            callback={loadMore}
          />
        </div>
      )}
    </div>
  )
}

export default ListComment
