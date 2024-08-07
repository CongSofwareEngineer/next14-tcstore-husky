'use client'
import ButtonForm from '@/components/ButtonForm'
import InputForm from '@/components/InputForm'
import MyForm from '@/components/MyForm'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import { REQUEST_TYPE } from '@/constant/app'
import { BodyUserData } from '@/constant/firebase'
import useCheckForm from '@/hook/useCheckForm'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useUserData from '@/hook/useUserData'
import ServerApi from '@/services/serverApi'
import { encryptData } from '@/utils/crypto'
import { showNotificationError } from '@/utils/functions'
import { Checkbox } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ContainerRegister = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
  max-width: 1000px;
  margin: auto;
`

const RegisterScreen = () => {
  const { translate } = useLanguage()
  const router = useRouter()
  const { checkNumberPhone } = useCheckForm()
  const { isMobile } = useMedia()
  const { login } = useUserData()

  const [formData, setFormData] = useState<any>(null)
  const [loadingRegister, setLoadingRegister] = useState(false)

  useEffect(() => {
    const footer = window.document.getElementsByClassName('main-content')[0]
    if (footer) {
      footer.classList.add('bg-custom-register')
    }
    const initData = {
      name: '',
      sdt: '',
      pass: '',
      passAgain: '',
      sex: true,
      saveLogin: true,
    }
    setFormData(initData)
    return () => footer.classList.remove('bg-custom-register')
  }, [])

  const handleSubmit = async () => {
    setLoadingRegister(true)

    if (formData.pass !== formData.passAgain) {
      showNotificationError(translate('warning.passAgain'))
    } else {
      const bodyUser: BodyUserData = {
        addressShipper: [],
        exp: 0,
        sdt: formData.sdt,
        sex: formData.sex,
        isAdmin: false,
        name: formData.name,
        pass: encryptData(formData.pass),
        avatar: '',
        address: '',
      }

      const newData = await ServerApi.requestBase({
        url: '/user/register',
        body: bodyUser,
        encode: true,
        method: REQUEST_TYPE.POST,
        checkAuth: false,
      })
      console.log({ newData })

      if (!newData?.data) {
        showNotificationError(translate('register.exitSDT'))
      } else {
        await login(formData.sdt, formData.pass, !!formData?.saveLogin)
      }
    }
    setLoadingRegister(false)
  }

  return (
    <ContainerRegister>
      <div className="w-full flex justify-between h-full items-center">
        {!isMobile && (
          <div className="flex-1 flex flex-col justify-center items-center max-w-[450px]">
            <MyImage
              alt={'tc-store-logo-register'}
              className="cursor-pointer max-w-0["
              onClick={() => router.push('/')}
              src={images.logoStore}
            />
          </div>
        )}

        <div className="flex justify-start items-start md:w-fit w-full">
          <div className="m-auto flex flex-col md:w-[450px] w-full shadow-md p-8 rounded-[16px] justify-center align-middle bg-white">
            <h1 className="mb- uppercase font-bold text-center text-[16px]">
              {translate('register.title')}
            </h1>
            <MyForm
              onValuesChange={(_, value) =>
                setFormData({ ...formData, ...value })
              }
              formData={formData}
              onFinish={handleSubmit}
            >
              <InputForm
                name="sdt"
                required
                validator={checkNumberPhone}
                label={translate('productDetail.modalBuy.enterNumberPhone')}
              />

              <InputForm
                name="name"
                required
                label={translate('productDetail.modalBuy.enterName')}
              />

              <InputForm
                name="pass"
                isPass
                required
                label={translate('register.enterPassWord')}
              />
              <InputForm
                name="passAgain"
                isPass
                required
                label={translate('register.enterPassWordAgain')}
              />
              <div className="flex gap-2 mt-2 ">
                <div>{translate('userDetail.sex')} :</div>

                <Checkbox
                  checked={formData?.sex}
                  onChange={() => setFormData({ ...formData, sex: true })}
                >
                  {translate('textPopular.male')}
                </Checkbox>
                <Checkbox
                  checked={!formData?.sex}
                  onChange={() => setFormData({ ...formData, sex: false })}
                >
                  {translate('textPopular.female')}
                </Checkbox>
              </div>
              <div className="flex gap-2  md:mt-0 mt-3 md:mb-0 mb-1 relative top-[-5px]">
                <div>{translate('register.saveRegister')} :</div>
                <Checkbox
                  checked={formData?.saveLogin}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      saveLogin: !formData?.saveLogin,
                    })
                  }
                />
              </div>

              <ButtonForm
                loading={loadingRegister}
                widthBtnSubmit={'100%'}
                classNameItem="w-full"
                className="w-full"
                disableClose
                titleSubmit={translate('header.register')}
              />
            </MyForm>
          </div>
        </div>
      </div>
    </ContainerRegister>
  )
}

export default RegisterScreen
