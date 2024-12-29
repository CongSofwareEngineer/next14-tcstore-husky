import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import { FirebaseServices } from '@/services/firebaseService'
import { Button, Image, Input } from 'antd'
import { Auth, ConfirmationResult, RecaptchaVerifier } from 'firebase/auth'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import OtpInput from 'react-otp-input'

type CaptchaOtpProps = {
  callback?: (param?: any) => any
  numberPhone?: string
}
const CaptchaOtp = ({ numberPhone = '', callback }: CaptchaOtpProps) => {
  const [loadingCheckPinCode, setLoadingCheckPinCode] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isErrorCode, setIsErrorCode] = useState(false)
  const [otpReceived, setOtpReceived] = useState<ConfirmationResult | null>(null)
  const [pinCode, setPinCode] = useState<string>()
  const [isErrorManyRequest, setIsErrorManyRequest] = useState(false)

  const [reCaptchaVerifier, setReCaptchaVerifier] = useState<RecaptchaVerifier | null>(null)
  const [auth, setAuth] = useState<Auth | null>(null)

  const { closeModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()

  useLayoutEffect(() => {
    const auth = FirebaseServices.initAuth()
    setAuth(auth)
  }, [])

  useEffect(() => {
    let recaptChaClient: RecaptchaVerifier

    if (auth) {
      recaptChaClient = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      })
      setReCaptchaVerifier(recaptChaClient)
    }

    return () => {
      if (recaptChaClient) {
        recaptChaClient?.clear()
      }
    }
  }, [auth])

  const handleSendOtp = async () => {
    try {
      setIsPending(true)
      const otpRes = await FirebaseServices.sendNumberToGetOtp(
        numberPhone,
        auth!,
        reCaptchaVerifier!
      )
      setOtpReceived(otpRes)
    } catch (error) {
      setIsErrorManyRequest(true)
      console.log({ errorhandleSendOtp: error })
    }
  }

  const handleVerifyOtp = async () => {
    try {
      setLoadingCheckPinCode(true)
      if (otpReceived) {
        const isVerify = await otpReceived.confirm(pinCode!)

        if (isVerify && callback) {
          await callback()
        }
      }
    } catch (error) {
      console.log({ errorhandleVerifyOtp: error })
      setIsErrorCode(true)
    } finally {
      setTimeout(() => {
        setLoadingCheckPinCode(false)
      }, 3000)
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <div id='recaptcha-container' className='absolute opacity-0 z-[-1]'></div>
      <div className='flex relative justify-center mt-5 mb-2'>
        <OtpInput
          value={pinCode}
          onChange={setPinCode}
          numInputs={6}
          renderSeparator={<div className='mx-1 w-[10px] border-[1px] border-black' />}
          renderInput={(props: any) => (
            <div className=' md:w-9 w-8 '>
              <Input {...props} className='border-2 !w-full border-gray-200' />
            </div>
          )}
        />
        {!isPending && <div className='absolute w-full h-full cursor-not-allowed opacity-75' />}
      </div>
      {isPending && !isErrorManyRequest && (
        <div className='flex justify-center items-center'>
          <div className='md:w-[80px] w-[60px] aspect-square overflow-hidden relative '>
            <Image
              className='!relative animate-spin3s'
              src={'https://smart.keyring.app/assets/images/Icon/ic_creating_passkey.png'}
              alt='loading'
              preview={false}
            />
          </div>
        </div>
      )}
      <div className='text-center'>{translate('verifyNumberPhone.note')}</div>
      {isErrorCode && <div className='text-red-500 text-center'>{translate('errors.pinCode')}</div>}
      {isErrorManyRequest && (
        <div className='text-red-500 text-center'>{translate('verifyNumberPhone.manyRequest')}</div>
      )}
      <div className='flex gap-3 w-full'>
        {!isPending ? (
          <Button className='flex-1' onClick={handleSendOtp}>
            {translate('verifyNumberPhone.receiveCode')}
          </Button>
        ) : (
          <Button
            disabled={isErrorManyRequest || !pinCode || pinCode?.length! < 6}
            loading={loadingCheckPinCode}
            className='flex-1'
            onClick={handleVerifyOtp}
          >
            {translate('verifyNumberPhone.verifyCode')}
          </Button>
        )}

        <Button className='flex-1' onClick={closeModalDrawer} type='primary'>
          {translate('common.close')}
        </Button>
      </div>
    </div>
  )
}

export default CaptchaOtp
