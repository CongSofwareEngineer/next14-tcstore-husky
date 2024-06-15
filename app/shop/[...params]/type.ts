export type ItemDetailType = {
  imageMain?: string
  typeProduct?: string
  des?: string
  name: string
  id?: string
  [key: string]: any
}

export type ModalBuyLoginType = {
  data?: ItemDetailType
  amount: number
}