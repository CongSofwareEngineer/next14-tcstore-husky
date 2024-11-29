import { QUERY_KEY } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'
import { useQuery } from '@tanstack/react-query'
import useUserData from '../useUserData'

const getData = async ({ queryKey }: any) => {
  const idProduct = queryKey[1]
  const userData = queryKey[2]
  const res = await ClientApi.getComments(`${idProduct}/${userData?.sdt}`)
  return res?.data || null
}

const useCommentDetail = (idProduct?: string) => {
  const { userData } = useUserData()

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GetCommentDetail, idProduct, userData],
    enabled: !!idProduct,
    queryFn: getData,
  })
  return { data, isLoading }
}

export default useCommentDetail