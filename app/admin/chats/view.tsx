'use client'
import FBRealtimeUtils from '@/utils/firebaseRealtime'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { ContentItemChatProps, ItemChatProps } from './type'
import ItemChat from './Components/ItemChat'
import useModalDrawer from '@/hook/useModalDrawer'
import ItemReplyChat from './Components/ItemReplyChat'
import useLanguage from '@/hook/useLanguage'

const ChatsAdminScreen: NextPage = () => {
  const [listChat, setListChat] = useState<ItemChatProps[]>([])
  const [db] = useState(new FBRealtimeUtils('Chat'))

  const { openModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()

  useEffect(() => {
    db.listenerOnValue((data) => {
      const arr: ItemChatProps[] = data.map((e) => {
        const key = e.key
        delete e.key
        return { key, content: e }
      })

      setListChat(arr)
    })
  }, [db])

  const handleClick = (key: string, item: ContentItemChatProps | null) => {
    const listChatDetail = listChat.filter((e) => e.key === key)
    openModalDrawer({
      content: <ItemReplyChat listChats={listChatDetail} item={item} keyChat={key} />,
      title: translate('common.reply'),
      useDrawer: true,
      configDrawer: {
        noPadding: true,
      },
      configModal: {
        classContent: 'min-h-[50vh]',
      },
    })
  }

  return (
    <div className='flex flex-col gap-3 w-full'>
      {listChat.map((e) => {
        return <ItemChat onClick={handleClick} data={e} key={e.key} />
      })}
    </div>
  )
}

export default ChatsAdminScreen
