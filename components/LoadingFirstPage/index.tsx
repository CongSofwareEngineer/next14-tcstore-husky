'use client'
import React, { useLayoutEffect, useState } from 'react'
import { Spin } from 'antd'

const LoadingFirstPage = () => {
  const [isClient, setIsClient] = useState(false)
  useLayoutEffect(() => {
    setIsClient(true)
  }, [])
  return !isClient ? (
    <div className="bg-white z-[999999999] flex w-screen h-screen fixed justify-center items-center inset-0">
      <Spin />
    </div>
  ) : (
    <></>
  )
}

export default LoadingFirstPage
