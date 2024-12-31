import { PAGE_SIZE_LIMIT } from '@/constant/app'
import { QUERY_KEY, TypeHookReactQuery } from '@/constant/reactQuery'
import useUserData from '@/hook/useUserData'
import AdminApi from '@/services/adminApi'
import { isObject } from '@/utils/functions'
import { useInfiniteQuery } from '@tanstack/react-query'

const getData = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: any
  pageParam: any
}): Promise<TypeHookReactQuery> => {
  try {
    const query = queryKey[1]
    let queryUrl = `?page=${pageParam}&limit=${PAGE_SIZE_LIMIT}`
    if (isObject(query)) {
      for (const key in query) {
        queryUrl += `&${key}=${query[key]?.toString()}`
      }
    }

    const dataServer = await AdminApi.getComments(queryUrl)

    return {
      data: dataServer?.data || [],
      page: pageParam,
    }
  } catch (error) {
    return {
      data: [],
      page: pageParam,
    }
  }
}

const useCommentAdmin = (queries: Record<string, (string | null)[]> | null) => {
  const { isLogin } = useUserData()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.GetCommentAdmin, queries],
    queryFn: getData,
    enabled: !!isLogin,
    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage?.data?.length == PAGE_SIZE_LIMIT) {
        return lastPage.page + 1
      }
      return null
    },
  })

  const dataFinal = data?.pages?.flatMap((e: any) => e.data) || []

  return {
    data: dataFinal,
    isLoading,
    loadMore: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}

export default useCommentAdmin
