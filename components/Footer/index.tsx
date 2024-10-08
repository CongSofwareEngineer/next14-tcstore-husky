'use client'
import { images } from '@/configs/images'
import useMedia from '@/hook/useMedia'
import React, { useEffect } from 'react'
import MyImage from '../MyImage'
import { CopyOutlined } from '@ant-design/icons'
import { scrollTop } from '@/utils/functions'
import { useRouter } from 'next/navigation'
import SocialMediaShare from '../SocialMediaShare'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { copyToClipboard } from '@/utils/notification'
const GgMap = dynamic(() => import('./ggMap'), { ssr: true })

const Item = ({ icon, value, link }: any) => {
  const { isMobile } = useMedia()

  return (
    <div className="flex gap-2 items-center">
      <MyImage
        widthImage={isMobile ? '20px' : '25px'}
        heightImage={isMobile ? '20px' : '25px'}
        alt={`icon-footer-${value}`}
        src={icon}
      />
      <Link
        target="_blank"
        href={link}
        className="hover:underline cursor-pointer"
      >
        {value}
      </Link>
      <CopyOutlined onClick={() => copyToClipboard(value)} />
    </div>
  )
}
const Footer = () => {
  const patchName = useRouter()
  useEffect(() => {
    scrollTop()
  }, [patchName])

  return (
    <footer className="no footer-web w-full bg-white flex justify-center md:mt-5 mt-3">
      <SocialMediaShare />
      <div className="flex flex-col w-full items-center justify-center">
        <div className=" w-full max-w-[1350px] md:p-[50px] p-[20px]  pb-10 ">
          <h3 className="text-medium font-bold mb-2">Thông tin vẻ Shop</h3>
          <div className="flex md:flex-row flex-col w-full justify-between md:gap-0 gap-4">
            <div className="flex flex-col md:gap-3 gap-2 md:w-[48%] w-full">
              <Item
                icon={images.footer.iconGmail}
                value={'hodiencong2000.@gmail.com'}
                link="mailto:hodiencong2000.@gmail.com"
              />
              <Item
                icon={images.footer.iconNumberPhone}
                value={'Hồ Diên Công'}
                link="tel:0392225405"
              />

              <Item
                icon={images.footer.iconZalo}
                value={'0392225405'}
                link="https://zalo.me/0392225405"
                type={'zalo'}
              />
              <Item
                icon={images.footer.iconFace}
                value={'Facebook'}
                link="https://www.facebook.com/profile.php?id=100080400793331"
              />
              <Item
                icon={images.footer.iconGithub}
                value={'CongSofwareEngineer'}
                link="https://github.com/CongSofwareEngineer"
              />
              <Item
                icon={images.footer.iconAddress}
                value={'83/41, Phạm Văn Bạch, P.15, Tân Bình, TP.HCM'}
                link="https://www.google.com/maps/place/83%2F41+Ph%E1%BA%A1m+V%C4%83n+B%E1%BA%A1ch,+Ph%C6%B0%E1%BB%9Dng+15,+T%C3%A2n+B%C3%ACnh,+H%E1%BB%93+Ch%C3%AD+Minh,+Vietnam/@10.8169953,106.6286017,17z/data=!3m1!4b1!4m6!3m5!1s0x317529d60f102fe1:0x48a05f8f5cd877f6!8m2!3d10.8169953!4d106.6334726!16s%2Fg%2F11l5hwgmt7?entry=ttu"
              />
            </div>
            <div className="w-full md:w-[48%] min-h-[200px]">
              <GgMap />
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-center mb-2">
          <span>Copyright © 2024</span>
          <Link href={'https://hdcong.vercel.app/'} target="_blank">
            <span className="hover:underline hover:scale-105">CÔNG</span>
          </Link>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
