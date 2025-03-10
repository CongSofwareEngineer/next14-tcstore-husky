import React from 'react'
import { useModalAdmin as useModalAdminZustand } from '@/zustand/useModalAdmin'
import { AiOutlineClose } from 'react-icons/ai'
import { cn } from '@/utils/tailwind'

const MyModalAdmin = () => {
  const { modalAdmin, closeModal } = useModalAdminZustand()

  const onClick = (event: any) => {
    if (event.target === event.currentTarget) {
      if (!modalAdmin.overClickClose) {
        closeModal(true)
      }
    }
  }
  return modalAdmin.body ? (
    <div
      onClick={onClick}
      className='fixed z-[9999999] flex justify-center items-center flex-col inset-0 w-[100dvw] h-[100dvh] bg-black/20 '
    >
      <div
        className={cn(
          'md:w-[500px] w-[90dvw] animate-zoom  transition-all duration-500 relative flex flex-col justify-center items-center bg-white rounded-xl p-5',
          modalAdmin.className
        )}
      >
        {modalAdmin.showBtnClose && (
          <div className='absolute z-10 text-xl right-5 top-5 flex justify-end'>
            <AiOutlineClose className='cursor-pointer' onClick={() => closeModal(true)} />
          </div>
        )}
        {modalAdmin.title && (
          <div className='text-medium mb-2 font-bold w-full'>{modalAdmin.title}</div>
        )}
        {modalAdmin.body}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default MyModalAdmin
