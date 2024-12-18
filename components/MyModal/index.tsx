'use client'
import React, { createContext, useState } from 'react'
import ModalConfig from './modalConfig'
import { ConfigModal, ContainerContextProps } from './type'
import useMedia from '@/hook/useMedia'

const defaultValue: ContainerContextProps = {
  config: {
    content: <></>,
  },
  closeModal: () => {},
  openModal: () => {},
}

const defaultConfig: ConfigModal = {
  content: <></>,
  showHeader: true,
}
export const ModalContext = createContext<ContainerContextProps>(defaultValue)

const MyModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<ConfigModal>(defaultConfig)
  const { isClient } = useMedia()

  const closeModal = () => {
    setConfig({ ...config, width: '500px', className: '', content: null, open: false })
  }

  const openModal = (config: ConfigModal) => {
    setConfig((state) => ({ ...state, ...config, open: true }))
  }

  return (
    <ModalContext.Provider value={{ config, closeModal, openModal }}>
      {children}
      {isClient && <ModalConfig config={config} closeModal={closeModal} />}
    </ModalContext.Provider>
  )
}

export default MyModalProvider
