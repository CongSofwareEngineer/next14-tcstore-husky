import { Button, Rate } from 'antd'
import React from 'react'
import ModalWrite from './ModalWrite'
import { ItemDetailType } from '@/components/InfoItemDetail/type'
import useMedia from '@/hook/useMedia'
import useLanguage from '@/hook/useLanguage'
import useMyDrawer from '@/hook/useMyDrawer'

const WriteComment = ({ dataItem }: { dataItem: ItemDetailType }) => {
  const { openModalDrawer } = useMyDrawer()
  const { isMobile } = useMedia()
  const { translate } = useLanguage()

  const handleWrite = () => {
    openModalDrawer({
      content: <ModalWrite dataItem={dataItem} />,
      useDrawer: true,
      title: <div className="text-medium">ĐÁNH GIÁ CỦA BẠN VỀ SẢN PHẨM</div>,
      configDrawer: {
        height: 'auto',
      },
      configModal: {
        width: '600px',
      },
    })
  }
  return (
    <div className="flex md:flex-row flex-col md:gap-10 gap-5 justify-between">
      <div className="flex flex-col gap-2 justify-center md:items-center">
        <div className="text-medium font-bold">Đánh giá sản phẩm</div>
        <div className="text-[30px] font-bold text-green-500">5.0/5</div>
        <Rate
          disabled
          defaultValue={5}
          style={{ fontSize: isMobile ? 15 : 18 }}
        />
        <div className="opacity-75"> (23 đánh giá)</div>
        {/* {isMobile && (
          <div className="flex flex-col gap-2 flex-1  md:items-center">
            <Button onClick={handleWrite}>Viet binh luan</Button>
          </div>
        )} */}
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex gap-2 w-full">
          <Rate
            disabled
            defaultValue={4}
            style={{ fontSize: isMobile ? 16 : 18 }}
          />
          <span>({translate('comment.veryGood')})</span>
        </div>
        <div className="flex gap-2 w-full">
          <Rate
            disabled
            defaultValue={3}
            style={{ fontSize: isMobile ? 16 : 18 }}
          />
          <span>({translate('comment.good')})</span>
        </div>
        <div className="flex gap-2 w-full">
          <Rate
            disabled
            defaultValue={2}
            style={{ fontSize: isMobile ? 16 : 18 }}
          />
          <span>({translate('comment.normal')})</span>
        </div>
        <div className="flex gap-2 w-full">
          <Rate
            disabled
            defaultValue={1}
            style={{ fontSize: isMobile ? 16 : 18 }}
          />
          <span>({translate('comment.bad')})</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1  items-center">
        <div className="text-medium text-center">
          {translate('comment.writeToShare')}
        </div>
        <Button onClick={handleWrite}>
          {translate('common.writeComment')}
        </Button>
      </div>
    </div>
  )
}

export default WriteComment
