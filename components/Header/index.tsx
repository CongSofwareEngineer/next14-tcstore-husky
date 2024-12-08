'use client'
import React from 'react'
import { images } from '@/configs/images'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const Nav = dynamic(() => import('./Component/Nav'), { ssr: true })
const Account = dynamic(() => import('./Component/Account'), { ssr: true })

const Header = () => {
  return (
    <header className='header-main'>
      <a
        aria-label='mailto:hodiencong2000.@gmail.com'
        href='mailto:hodiencong2000.@gmail.com'
        className='absolute z-[-1] opacity-0'
      />
      <a aria-label='tel:0932225405' href='tel:0932225405' className='absolute z-[-1] opacity-0' />
      <div className='w-full h-14 ' />
      <div className='w-full h-14 fixed z-10 inset-0 '>
        <div className='border-b-2 border-green-300 w-full flex m-auto justify-center items-center bg-white'>
          <div
            id='id-container-header'
            className='md:px-12 px-5 h-14 w-full max-w-[1350px] flex md:gap-3 justify-between items-center'
          >
            <div className='h-full relative '>
              <Link href={'/'}>
                <Image src={images.logo} alt='logo-tcstore' fill className='!relative !w-auto !h-full' />
              </Link>
            </div>
            <Nav />
            <Account />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
