import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import React, { useEffect, useMemo, useState } from 'react'
import { PaymentShopType } from '../../type'
import useOptionPayment from '@/hook/useOptionPayment'
import BillFinal from '@/app/my-cart/Component/Payment/Component/BillFinal'
import MyForm from '@/components/Form/MyForm'
import ContentFormPayment from '@/components/ContentFormPayment'
import BtnBackUI from '@/components/BtnBackUI'
import {
  delayTime,
  getDataLocal,
  numberWithCommas,
  saveDataLocal,
  scrollTop,
} from '@/utils/functions'
import InfoBill from './InfoBill'
import { QUERY_KEY } from '@/constant/reactQuery'
import { BodyAddBill } from '@/constant/firebase'
import useModalDrawer from '@/hook/useModalDrawer'
import ModalProcess from '@/components/ModalProcess'
import ModalDelete from '@/components/ModalDelete'
import { FILTER_BILL, LOCAL_STORAGE_KEY, REQUEST_TYPE } from '@/constant/app'
import ModalSuccess from '@/components/ModalSuccess'
import { useRouter } from 'next/navigation'
import ClientApi from '@/services/clientApi'
import OptionsPayemnt from '@/app/my-cart/Component/Payment/Component/OptionsPayemnt'
import { showNotificationError } from '@/utils/notification'

const PaymentShop = ({ data, callBack, amount }: PaymentShopType) => {
  const { translate } = useLanguage()
  const route = useRouter()
  const { userData, isLogin } = useUserData()
  const { refreshQuery } = useRefreshQuery()
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const { onChangeOptions, listOptions, optionSelected } = useOptionPayment()

  const [formData, setFormData] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    scrollTop()
    const initData = {
      sdt: userData?.sdt,
      name: userData?.name,
      addressShip: userData?.addressShipper[0]!,
      linkContact: userData?.linkContact!,
      gmail: userData?.gmail,
      noteBil: '',
    }
    setFormData(initData)
  }, [userData, isLogin])

  const isValidSubmit = useMemo(() => {
    if (!formData?.addressShip) {
      return false
    }
    return !!formData?.addressShip.addressDetail
  }, [formData])

  const onChangeAddressShip = (item: any) => {
    setFormData({
      ...formData,
      addressShip: {
        ...item,
      },
    })
  }

  const saveDataNoLogin = (bodyBill: BodyAddBill) => {
    if (!isLogin) {
      const listSDT: string[] = getDataLocal(LOCAL_STORAGE_KEY.ListSDTBuy) || []

      if (!listSDT.find((e) => e === bodyBill.sdt)) {
        saveDataLocal(LOCAL_STORAGE_KEY.ListSDTBuy, [...listSDT, bodyBill.sdt])
      }
    }
  }

  const handleSubmit = async () => {
    const callBack = async () => {
      setLoading(true)

      const bodyBill: BodyAddBill = {
        addressShip: formData?.addressShip,
        discount: 0,
        sdt: formData?.sdt,
        idUser: isLogin ? userData?._id : 'no-id',
        listBill: [
          {
            amount: amount,
            _id: data?._id!,
            keyName: data?.keyName,
          },
        ],
        status: FILTER_BILL.Processing,
        totalBill: data?.price * amount,
        listNewSoldProduct: [
          {
            sold: amount + data?.sold,
            idProduct: data?._id,
          },
        ],
      }
      console.log({ bodyBill, data })

      saveDataNoLogin(bodyBill)

      openModalDrawer({
        content: (
          <ModalProcess
            title={translate('confirm.bill.createBill')}
            des={translate('confirm.bill.createBill_Des')}
          />
        ),
        configModal: {
          showHeader: false,
          showBtnClose: false,
          overClickClose: false,
        },
      })

      const res = await ClientApi.fetchData({
        url: 'bill/create',
        body: bodyBill,
        method: REQUEST_TYPE.POST,
      })

      if (res?.data) {
        openModalDrawer({
          content: (
            <ModalSuccess
              showClose
              title={translate('productDetail.modalBuy.success')}
              des={translate('productDetail.modalBuy.successDes')}
              titleSubmit={translate('common.viewBill')}
              titleClose={translate('common.ok')}
              callback={() => {
                route.push('/my-page/bill')
                closeModalDrawer()
              }}
            />
          ),
        })
        await delayTime(500)
        refreshQuery(QUERY_KEY.MyCartUser)
        refreshQuery(QUERY_KEY.GetProductByID)
        refreshQuery(QUERY_KEY.MyBillUser)
        refreshQuery(QUERY_KEY.LengthCartUser)
        await delayTime(500)
      } else {
        showNotificationError(translate('productDetail.modalBuy.error'))
        closeModalDrawer()
      }

      setLoading(false)
    }
    openModalDrawer({
      content: (
        <ModalDelete
          autoClose={false}
          callback={callBack}
          title={translate('confirm.bill.confirm')}
          des={translate('confirm.bill.confirm_des')}
          titleConfirm={translate('common.submit')}
        />
      ),
    })
  }

  return (
    <div className="w-full md:mb-7 mb-10 mt-1">
      <BtnBackUI
        clickBack={callBack}
        titlePageMain={translate('header.shop')}
        titlePage={data?.name}
      />
      <div className="flex flex-col gap-3 w-full mt-1">
        {formData && (
          <MyForm
            onFinish={handleSubmit}
            formData={formData}
            onValuesChange={(_, value) =>
              setFormData({ ...formData, ...value })
            }
          >
            {/* lg:max-h-[calc(100vh-126px)] hide-scroll */}
            <div className="flex lg:flex-row flex-col lg:gap-6 gap-5">
              <div className="flex flex-1 h-full overflow-y-auto  flex-col lg:max-w-[calc(100%-300px)]">
                <ContentFormPayment onChange={onChangeAddressShip} />
                <InfoBill data={data} amountBuy={amount} />
              </div>

              <div className="lg:w-[350px] flex flex-col md:gap-6 gap-5">
                <OptionsPayemnt
                  onChangeOptions={onChangeOptions}
                  listOptions={listOptions}
                  optionSelected={optionSelected}
                />
                <BillFinal
                  disabledSubmit={!isValidSubmit}
                  loading={loading}
                  totalBill={numberWithCommas(amount * data?.price)}
                  totalBillFeeShip={numberWithCommas(
                    amount * data?.price + 30000
                  )}
                />
              </div>
            </div>
          </MyForm>
        )}
      </div>
    </div>
  )
}

export default PaymentShop
