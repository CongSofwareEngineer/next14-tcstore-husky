import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
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
const Nav = () => {
  const { userData, isLogin } = useUserData()
  const { translate } = useLanguage()
  const pathname = usePathname()
  const { isMobile } = useMedia(900)

  const renderDesktop = () => {
    return (
      <div className="flex flex-1 gap-5 ml-2 ">
        <LinkCustom
          $isSelected={pathname === '/' || pathname === ''}
          href={'/'}
        >
          {translate('header.home')}
        </LinkCustom>
        <LinkCustom $isSelected={pathname === '/shop'} href={'/shop'}>
          {translate('header.shop')}
        </LinkCustom>
        <LinkCustom $isSelected={pathname === '/nests'} href={'/nests'}>
          {translate('textPopular.nest')}
        </LinkCustom>
        <LinkCustom $isSelected={pathname === '/shoes'} href={'/shoes'}>
          {translate('textPopular.shoes')}
        </LinkCustom>
        <LinkCustom $isSelected={pathname === '/contact'} href={'/contact'}>
          {translate('header.contact')}
        </LinkCustom>
        {!isLogin && (
          <LinkCustom $isSelected={pathname === '/register'} href={'/register'}>
            {translate('header.register')}
          </LinkCustom>
        )}
        {!!userData?.isAdmin && (
          <LinkCustom $isSelected={pathname.includes('/admin')} href={'/admin'}>
            Admin
          </LinkCustom>
        )}
      </div>
    )
  }

  return isMobile ? <></> : renderDesktop()
}

export default Nav
