import ImageAdmin from '@/components/ImageAdmin'
import { ItemDetailType } from '@/components/InfoItemDetail/type'
import MyLoadMore from '@/components/MyLoadMore'
import useComment from '@/hook/tank-query/useComment'
import { detectAvatar, ellipsisText } from '@/utils/functions'
import { Rate } from 'antd'
import React from 'react'
import LoadingData from './LoadingData'
import Image from 'next/image'
import useLanguage from '@/hook/useLanguage'

const ListComment = ({ dataItem }: { dataItem: ItemDetailType }) => {
  const { translate } = useLanguage()
  const { data, isLoading, hasNextPage, isFetchingNextPage, loadMore } = useComment(dataItem?._id)

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-medium font-bold'>{translate('textPopular.comment')}:</div>

      {isLoading ? (
        <LoadingData loading={isLoading} />
      ) : (
        <div className='flex flex-col gap-2 max-h-[600px] overflow-y-auto'>
          {data.length === 0 && <div>{translate('textPopular.notData')}</div>}
          {data.map((e) => {
            return (
              <div key={e?.sdt} className='flex gap-4 pb-3 border-b-[1px] mt-1 border-b-gray-200'>
                <div className='aspect-square h-fit rounded-lg relative overflow-hidden w-[20%] md:min-w-[80px] min-w-[50px]  max-w-[100px]'>
                  <Image src={detectAvatar(e.user[0]?.avatar)} alt={e.sdt} fill className='!relative !w-full !h-auto' />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='font-bold'>{e.name}</p>
                  <div className='text-[10px]'>{`SĐT : ${ellipsisText(e.sdt, 4, 3)}`}</div>
                  <Rate disabled value={e.rate} style={{ fontSize: 15 }} />
                  <div className='my-1'>{e.note}</div>
                  <div className='flex flex-wrap w-full gap-2 mt-1 '>
                    {e.listImg.map((img: string) => {
                      return (
                        <div key={img} className='md:w-[50px] w-[30px] aspect-square relative overflow-hidden '>
                          <ImageAdmin key={img} src={img} alt={img} className='w-full' />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}

          <MyLoadMore hasLoadMore={hasNextPage} isFetchingNextPage={isFetchingNextPage} callback={loadMore} />
        </div>
      )}
    </div>
  )
}

export default ListComment
