import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useRoutePage from '@/hook/useRoutePage'
import useUserData from '@/hook/useUserData'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'

const LinkCustom = styled(styled(Link)<{ $isSelected?: Boolean }>``).attrs({
  className: 'hover:underline hover:text-blue-700 uppercase whitespace-nowrap',
})`
  color: ${(props) => (props.$isSelected ? 'blue !important' : 'black')};
  font-weight: ${(props) => (props.$isSelected ? '700 !important' : 'nonce')};
`

const LinkUrl = ({ url, text }: { url: string; text: string }) => {
  const pathname = usePathname()
  const route = useRoutePage()

  return (
    <LinkCustom $isSelected={pathname === url} href={url} onClick={() => route.push(url)}>
      {text}
    </LinkCustom>
  )
}
const Nav = () => {
  const { userData, isLogin } = useUserData()
  const { translate } = useLanguage()
  const pathname = usePathname()
  const { isMobile } = useMedia(900)
  const route = useRoutePage()

  const renderDesktop = () => {
    return (
      <div className='flex flex-1 gap-5 ml-2 '>
        <LinkCustom $isSelected={pathname === '/' || pathname === ''} href={'/'} onClick={() => route.push('/')}>
          {translate('header.home')}
        </LinkCustom>

        <LinkUrl text={translate('header.shop')} url='/shop' />
        <LinkUrl text={translate('textPopular.shoes')} url='/shoes' />
        <LinkUrl text={translate('textPopular.nest')} url='/nests' />

        {!isLogin && <LinkUrl text={translate('header.register')} url='/register' />}
        {!!userData?.isAdmin && <LinkUrl text={'Admin'} url='/admin' />}
      </div>
    )
  }

  return isMobile ? <></> : renderDesktop()
}

export default Nav
