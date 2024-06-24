import React, { useEffect, useState } from 'react'
import { ModalPaymentType } from '../../type'
import useUserData from '@/hook/useUserData'
import useLanguage from '@/hook/useLanguage'
import useModal from '@/hook/useModal'
import useDrawer from '@/hook/useDrawer'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import ClientApi from '@/services/clientApi'
import { DataBase, FB_FC } from '@/constant/firebase'
import { QueryKey } from '@/constant/reactQuery'
import MyForm from '@/components/MyForm'
import InputForm from '@/components/InputForm'
import { parsePhoneNumber } from 'libphonenumber-js'
import SelectInputEx from '@/app/shop/[...params]/Component/ModalBuy/SelectInputEx'
import ButtonForm from '@/components/ButtonForm'
import useMedia from '@/hook/useMedia'

const ModalPayment = ({ dataCart, callBack }: ModalPaymentType) => {
  const { userData, isLogin, refreshLogin } = useUserData()
  const { translate } = useLanguage()
  const { closeModal } = useModal()
  const { closeDrawer } = useDrawer()
  const { refreshQuery } = useRefreshQuery()
  const { isMobile } = useMedia()

  const [formData, setFormData] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(false)
  const [listAddressShip, setListAddressShip] = useState<string[]>([])

  useEffect(() => {
    if (userData) {
      console.log('====================================')
      console.log({ dataCart })
      console.log('====================================')
      const initData = {
        sdt: userData?.sdt,
        name: userData?.name,
        addressShip: userData?.addressShipper[0] || '',
        linkContact: userData?.linkContact || '',
        gmail: userData?.gmail || '',
        amount: dataCart.length,
      }
      setFormData(initData)
      if (Array.isArray(userData?.addressShipper)) {
        setListAddressShip(userData?.addressShipper)
      }
    }
  }, [userData])

  const handleClose = () => {
    refreshQuery(QueryKey.CartUser)
    refreshQuery(QueryKey.MyCartUser)
    if (isMobile) {
      closeDrawer()
    } else {
      closeModal()
    }
  }

  const handleAddAddress = async (address: string) => {
    const arrNew = [...listAddressShip, address]
    const handleUpdate = async () => {
      await ClientApi.requestBase({
        nameDB: DataBase.user,
        body: {
          id: userData?.id?.toString(),
          data: {
            addressShipper: arrNew,
          },
        },
        namFn: FB_FC.updateData,
        encode: true,
      })
      await refreshLogin()
    }
    handleUpdate()
    setListAddressShip(arrNew)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      console.log('handleSubmit')
      handleClose()
    } finally {
      setLoading(false)
    }
  }

  const checkNumberPhone = (sdt: string): string | null => {
    if (!sdt) {
      return translate('warning.errorSDT')
    }
    const phoneNumber = parsePhoneNumber(sdt, 'VN')
    if (phoneNumber && phoneNumber.isValid()) {
      return null
    }
    return translate('warning.errorSDT')
  }

  const getOptions = () => {
    if (Array.isArray(listAddressShip) && listAddressShip?.length > 0) {
      return listAddressShip.map((e) => ({ name: e, value: e }))
    }
    return []
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {formData && (
        <MyForm
          onFinish={handleSubmit}
          formData={formData}
          onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
        >
          <div className="flex md:gap-6 gap-3  flex-col">
            <div className="flex flex-1">
              <InputForm
                validator={checkNumberPhone}
                required
                name="sdt"
                label={translate('userDetail.sdt')}
                classFromItem="w-full"
              />
            </div>
            <div className="flex flex-1">
              <InputForm
                required
                name="name"
                label={translate('userDetail.name')}
                classFromItem="w-full"
              />
            </div>
            <div className="flex flex-1">
              <InputForm
                name="gmail"
                label={translate('productDetail.modalBuy.enterGmail')}
                classFromItem="w-full"
              />
            </div>
            {isLogin ? (
              <SelectInputEx
                required
                callBackAdd={(e) => handleAddAddress(e)}
                name="addressShip"
                label={translate('productDetail.modalBuy.enterAddress')}
                options={getOptions()}
                configSelect={{
                  showSearch: true,
                }}
              />
            ) : (
              <InputForm
                required
                name="addressShip"
                label={translate('productDetail.modalBuy.enterAddress')}
                classFromItem="w-full"
              />
            )}
          </div>
          <ButtonForm loading={loading} disableClose />
        </MyForm>
      )}
    </div>
  )
}

export default ModalPayment
