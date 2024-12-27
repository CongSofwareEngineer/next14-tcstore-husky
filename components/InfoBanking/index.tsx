import VietcomBankService from '@/services/vietcombank'
import React, { useEffect, useState } from 'react'
import MyImage from '../MyImage'
import useLanguage from '@/hook/useLanguage'
import TextCopy from '../TextCopy'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { images } from '@/configs/images'
import useMedia from '@/hook/useMedia'

const InfoBanking = ({ amount, callback = () => {} }: { amount: number; callback?: () => any }) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const [qrCode, setQrCode] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loadingCheck, setLoadingCheck] = useState(false)
  const [isBanking, setIsBanking] = useState(false)

  useEffect(() => {
    ;(async () => {
      const mess = VietcomBankService.generateMess()
      const qr = VietcomBankService.createQR(amount, mess)
      setQrCode(qr)
      setMessage(mess)
    })()
  }, [])

  const checkBanking = async () => {
    if (isMobile) {
      VietcomBankService.openDeepLink(amount, message)
    } else {
      setLoadingCheck(true)
      setLoadingCheck(false)
    }
  }

  const checkFac = async () => {
    const data = await VietcomBankService.checkBanking()
    console.log({ data })
  }

  return (
    <div className='flex md:flex-row md:py-1 mt-2 overflow-y-auto flex-col md:gap-5 gap-2 justify-center w-full'>
      <div className='relative w-full flex-1 flex md:pb-0 pb-[100%]   aspect-square overflow-hidden'>
        <div className='absolute w-full aspect-square flex justify-center'>
          <div className='relative md:w-full  w-[90%] aspect-square '>
            <MyImage key={Date.now()} src={qrCode} alt='QR' className='!relative !w-full !h-auto ' />
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-1 gap-2 '>
        {/* <Button onClick={checkFac}>check baninkg</Button> */}
        <div className='flex gap-2'>
          <div className='font-bold'>NH : VietCombank</div>

          <div className='relative w-6 rounded-lg aspect-square overflow-auto'>
            <MyImage src={images.logoVCB} alt='logo VCB' className='!relative !w-full !h-auto ' />
          </div>
        </div>
        <div className='flex  md:gap-2 gap-1'>
          <span className='font-bold'>{`STK : `}</span>
          <TextCopy value={process.env.NEXT_PUBLIC_VCB_STK} textView={process.env.NEXT_PUBLIC_VCB_STK} />
        </div>
        <div className='flex  flex-col  gap-1'>
          <span className='font-bold'>{translate('textPopular.content')} :</span>
          <TextCopy value={message} textView={message} />
        </div>
        <div className='rounded-lg flex p-3 w-full bg-[#f6cf83]'>
          <span className='mr-1'>
            <ExclamationCircleOutlined />
          </span>
          <span>Nội dung chuyển khoản phải ghi đúng để bạn khiếu nãi và kiểm tra hoá đơn.</span>
        </div>
        <div className='flex gap-3 mt-3'>
          {isMobile ? (
            <>
              <Button onClick={checkBanking} loading={loadingCheck} className='flex-1'>
                {translate('banking.openApp')}
              </Button>
              <Button onClick={callback} disabled={isBanking} type='primary' className='flex-1'>
                {translate('textPopular.sended')}
              </Button>
            </>
          ) : (
            <Button onClick={callback} disabled={isBanking} className='flex-1'>
              {translate('textPopular.sended')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoBanking