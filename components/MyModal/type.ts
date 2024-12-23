import { ModalProps } from 'antd'

export type Placement = 'center' | 'auto' | 'top' | 'top-center' | 'bottom' | 'bottom-center' | undefined

export type ConfigModal = {
  classContainer?: string | 'w-[500px]'
  classContent?: string | ''
  classHeader?: string | ''
  content?: React.ReactNode
  open?: boolean | false
  showHeader?: boolean | true
  title?: React.ReactNode | string | undefined
  overClickClose?: boolean | true
  showBtnClose?: boolean | true
  positionModal?: Placement
  afterClose?: () => Promise<void> | void
  width?: string | number | '500px'
  height?: string | number | undefined
  moreConfig?: ModalProps
  className?: string
}

export type ModalPropsType = {
  config: ConfigModal
  closeModal: () => void
}

export type ContainerContextProps = {
  config: ConfigModal
  closeModal: () => void
  openModal: (param: ConfigModal) => void
}
