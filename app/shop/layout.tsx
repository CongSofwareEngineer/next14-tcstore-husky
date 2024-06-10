import { generateMetaBase } from '@/utils/serverNext'

export async function generateMetadata(_: any, parent: any) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Register',
  })
  return metaData
}

const LayoutShop = ({ children }: { children: React.ReactNode }) => {
  return children
}

export default LayoutShop