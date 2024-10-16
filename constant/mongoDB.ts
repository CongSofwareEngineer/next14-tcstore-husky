import { FILTER_BILL } from './app'

export type DataAddContact = {
  nameUser?: string
  sdt?: string
  emailUser?: string
  des?: string
}

export type DataAddCart = {
  amount: number
  date?: string
  idProduct?: string
  idUser?: string
  moreConfig?: { [key: string]: any }
}

export type DataAddComment = {
  idProduct?: string
  sdt?: string
  listImg?: { [key: string]: any }[]
  name?: string
  rate?: number
  note: string
}

export type BodyAddBill = {
  idUser?: string | undefined
  listBill: { _id: string; keyName?: string; amount: number; idCart?: string }[]
  addressShip: string
  discount: number
  sdt: string
  iDBanking?: number
  iDMomo?: number | string
  status: FILTER_BILL
  abort?: boolean
  totalBill: Number
  listNewSoldProduct?: { [key: string]: any }[]
}

const FILTER_BASE_DB = {
  page: 'page',
  limit: 'limit',
  id: 'id',
}

export const OPTION_FILTER_DB = {
  Poduct: {
    ...FILTER_BASE_DB,
    keyName: 'keyName',
  },
  Bill: {
    ...FILTER_BASE_DB,
    status: 'status',
    date: 'date',
    sdt: 'sdt',
    idUser: 'idUser',
  },
  User: {
    ...FILTER_BASE_DB,
    sdt: 'sdt',
    admin: 'admin',
  },
  Cart: {
    ...FILTER_BASE_DB,
    date: 'date',
    sdt: 'sdt',
  },
  Comment: {
    ...FILTER_BASE_DB,
    date: 'date',
    sdt: 'sdt',
    idProduct: 'idProduct',
  },
}

export enum KEY_OPTION_FILTER_DB {
  Poduct = 'Poduct',
  Bill = 'Bill',
  User = 'User',
  Cart = 'Cart',
  Comment = 'Comment',
}
