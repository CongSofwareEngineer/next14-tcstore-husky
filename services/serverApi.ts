import { RequestType } from '@/constant/app'
import { encryptData } from '@/utils/crypto'
import { pareResponseDataClient } from '@/utils/serverNext'
import axios from 'axios'

type TypeParma = {
  url: string,
  method?: string,
  body?: object,
  encode?: boolean,
  [key: string]: any
}

const ServerApi = {
  requestBase: async (param: TypeParma = {
    url: '',
    method: RequestType.GET,
    body: {},
    encode: false
  }) => {
    try {
      let req = null
      param[process.env.NEXT_PUBLIC_KEY_SALT] = process.env.NEXT_PUBLIC_KEY_SALT
      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG_API === 'true') {
        req = await axios.post('/api/serverApi', {
          data: encryptData(JSON.stringify(param)),
          url: `${param.url}`
        })
      } else {
        req = await axios.post('/api/serverApi', { data: encryptData(JSON.stringify(param)) })
      }

      return pareResponseDataClient(param, req?.data)

    } catch (error) {
      console.log({ errorrequestBase: error });
      return {
        data: null,
        error: error
      }
    }
  },
  getProduct: async (query = '') => {
    const res = await ServerApi.requestBase({
      url: `all-product${query}`,
    })
    return res
  },
  getLengthCart: async (idUser: string) => {
    const res = await ServerApi.requestBase({
      url: `length-cart/${idUser}`
    })
    return res
  },
  getAllCart: async (idUser: string, query: string) => {
    const res = await ServerApi.requestBase({
      url: `all-cart/${idUser}${query}`
    })
    return res.data
  },
}
export default ServerApi
