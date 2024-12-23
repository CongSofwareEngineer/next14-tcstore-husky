import ImageAdmin from '@/components/ImageAdmin'
import { ItemDetailType } from '@/components/InfoItemDetail/type'
import MyLoadMore from '@/components/MyLoadMore'
import useComment from '@/hook/tank-query/useComment'
import { detectAvatar, ellipsisText, numberWithCommas } from '@/utils/functions'
import { Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import LoadingData from './LoadingData'
import Image from 'next/image'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import ClientApi from '@/services/clientApi'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'
import { formatDateTime } from '@/utils/momentFunc'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import useModalDrawer from '@/hook/useModalDrawer'
import ModalDelete from '@/components/ModalDelete'
import ModalWrite from '../WriteComment/ModalWrite'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

const Like = ({
  data,
  isYourComment = false,
  dataProduct,
}: {
  data: any
  isYourComment: boolean
  dataProduct: any
}) => {
  const [isLike, setIsLike] = useState(false)
  const { userData, isLogin } = useUserData()
  const { translate } = useLanguage()
  const { refreshQuery } = useRefreshQuery()
  const { openModalDrawer } = useModalDrawer()

  useEffect(() => {
    const isLike = data?.userLikes?.some((id: string) => id === userData?._id)
    setIsLike(isLike)
  }, [userData, data])

  const handleLike = async () => {
    if (isLogin && !isYourComment) {
      setIsLike(!isLike)
      const body = {
        idUser: userData?._id,
        isLike: !isLike,
      }
      await ClientApi.likeComment(data._id, body)
      refreshQuery(QUERY_KEY.GetCommentProduction)
    }
  }

  const handleEdit = () => {
    openModalDrawer({
      content: <ModalWrite dataItem={dataProduct} />,
      useDrawer: true,
      title: <div className='text-medium'>{translate('feedback.title')}</div>,
      configModal: {
        width: '600px',
      },
    })
  }

  const handleDelete = () => {
    const callback = async () => {
      const bodyDelete = {
        imageDelete: data.listImg || [],
        id: data._id,
      }
      const res = await ClientApi.deleteComment(bodyDelete)
      if (res.data) {
        await refreshQuery(QUERY_KEY.GetCommentProduction)
        showNotificationSuccess(translate('success.delete'))
      } else {
        showNotificationError(translate('error.delete'))
      }
    }

    openModalDrawer({
      content: <ModalDelete callback={callback} />,
      configModal: {
        overClickClose: false,
        showBtnClose: false,
      },
    })
  }

  return (
    <div className='flex gap-2 mt-1 items-center'>
      <div className='!w-4 relative overflow-hidden cursor-pointer'>
        {isLike ? (
          <MyImage
            onClick={handleLike}
            className='!relative   !w-4 !h-auto'
            src={images.icon.iconHeart}
            alt='liked'
            style={{
              cursor: isYourComment || !isLogin ? 'default' : 'pointer',
            }}
          />
        ) : (
          <MyImage
            onClick={handleLike}
            className='!relative cursor-pointer !w-4 !h-auto'
            src={images.icon.iconHeart1}
            alt='unlike'
            style={{
              cursor: isYourComment || !isLogin ? 'default' : 'pointer',
            }}
          />
        )}
      </div>
      <span>
        {Array.isArray(data?.userLikes)
          ? data?.userLikes.length === 0
            ? translate('textPopular.useful')
            : numberWithCommas(data?.userLikes.length)
          : translate('textPopular.useful')}
      </span>
      {isYourComment && (
        <span className='text-green-500 text-lg '>
          <EditOutlined onClick={handleEdit} className='text-green-500 cursor-pointer' />
        </span>
      )}

      {userData?.isAdmin && (
        <span className='text-red-500 text-lg'>
          <DeleteOutlined className='cursor-pointer' onClick={handleDelete} />
        </span>
      )}
    </div>
  )
}
const ListComment = ({ dataItem }: { dataItem: ItemDetailType }) => {
  const { translate } = useLanguage()
  const { userData } = useUserData()
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
            const isYourComment = userData?.sdt === e?.sdt

            return (
              <div key={e?.sdt} className='flex md:gap-4 gap-3 pb-3 border-b-[1px] mt-1 border-b-gray-200'>
                <div className='aspect-square h-fit rounded-lg relative overflow-hidden w-[20%] md:min-w-[80px] min-w-[20px]  max-w-[40px]'>
                  <Image src={detectAvatar(e.user[0]?.avatar)} alt={e.sdt} fill className='!relative !w-full !h-auto' />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='font-bold'>{e.name}</p>
                  <div className='flex gap-2 text-[10px]'>
                    <span>{formatDateTime(e.date)}</span>
                    <span>|</span>
                    <div>{`SĐT : ${ellipsisText(e.sdt, 4, 3)}`}</div>
                  </div>
                  <Rate disabled value={e.rate} style={{ fontSize: 15 }} />

                  <div className='md:my-1 mt-1'>{e.note}</div>
                  <div className='flex flex-wrap w-full gap-2 mt-1 '>
                    {e.listImg.map((img: string) => {
                      return (
                        <div key={img} className='w-[50px]  aspect-square relative overflow-hidden '>
                          <ImageAdmin key={img} src={img} alt={img} className='w-full' />
                        </div>
                      )
                    })}
                  </div>
                  <Like dataProduct={dataItem} isYourComment={isYourComment} data={e} />
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
