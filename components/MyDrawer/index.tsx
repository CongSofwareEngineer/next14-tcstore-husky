'use client'
import useMedia from '@/hook/useMedia'
import { useDrawer } from '@/zustand/useDrawer'
import { Drawer } from 'antd'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { isIOS } from 'react-device-detect'

const ModalDrawer: NextPage = () => {
  const { isClient } = useMedia()
  const { closeDrawer, drawer } = useDrawer()

  useEffect(() => {
    if (drawer.open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [drawer])

  if (!isClient) {
    return <></>
  }
  return (
    <Drawer
      onClose={closeDrawer}
      style={{
        maxHeight: drawer.placement === 'right' || drawer.placement === 'left' ? 'unset' : '95dvh',
      }}
      {...drawer}
    >
      <div
        className='flex flex-col w-full'
        style={{
          maxHeight:
            drawer.placement === 'right' || drawer.placement === 'left'
              ? 'calc(100dvh - 100px)'
              : 'calc(95dvh - 100px)',
          height: 'auto',
        }}
      >
        {drawer.content ?? <></>}
        {isIOS && <div className='w-full mb-1' />}
      </div>
    </Drawer>
  )
}

export default ModalDrawer
