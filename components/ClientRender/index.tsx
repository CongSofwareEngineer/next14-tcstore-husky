'use client'
import React, { useEffect, useLayoutEffect } from 'react'
import Header from '../Header'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setMenuCategory } from '@/redux/categoryMenuSlice'
import useCheckPatchName from '@/hook/tank-query/useCheckPatchName'
import Footer from '../Footer'
import dynamic from 'next/dynamic'
import useUserData from '@/hook/useUserData'
import moment from 'moment'
import { LANGUAGE_SUPPORT } from '@/constant/app'
import useAos from '@/hook/useAos'
import { fetchProvinces } from '@/redux/provincesSlice'
import useMedia from '@/hook/useMedia'

const LoadingFirstPage = dynamic(() => import('../LoadingFirstPage'), {
  ssr: true,
})

const ToastNoti = dynamic(() => import('../ToastNoti'), {
  ssr: false,
})

const ClientRender = ({
  children,
  menuCategory,
}: {
  children: React.ReactNode
  menuCategory: any[]
}) => {
  const { Language } = useAppSelector((state) => state.app)

  useAos()
  useCheckPatchName()
  const dispatch = useAppDispatch()
  const { reLogin } = useUserData()
  const { isClient } = useMedia()

  useEffect(() => {
    console.log('====================================')
    console.log({ isClient })
    console.log('====================================')
    isClient && reLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient])

  useLayoutEffect(() => {
    dispatch(setMenuCategory(menuCategory))
    dispatch(fetchProvinces())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    switch (Language?.locale) {
      case LANGUAGE_SUPPORT.VN:
        // moment.locale('vi')
        break

      default:
        moment.locale('vi')
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Language])

  return (
    <>
      <Header />
      <main className="main-content w-full flex justify-center min-h-[calc(100vh-56px)]">
        <section
          id="id-section-content"
          className="section-content  w-full max-w-[1350px]  md:px-12 px-[20px]  md:pt-5 pt-2"
        >
          {children}
        </section>
      </main>
      <Footer />
      <LoadingFirstPage />
      <ToastNoti />
    </>
  )
}

export default ClientRender
