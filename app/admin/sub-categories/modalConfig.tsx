import InputForm from '@/components/Form/InputForm'
import MyForm from '@/components/Form/MyForm'
import MyInput from '@/components/MyInput'
import { LANGUAGE_SUPPORT } from '@/constant/app'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import useTypeFile from '@/hook/useTypeFile'
import { uppercase } from '@/utils/functions'
import React, { useEffect, useState } from 'react'

const SubCategoriesConfig = ({ item }: { item: any }) => {
  const { translate } = useLanguage()
  const { typeFile } = useTypeFile({ typeAndroid: '.png,.jpg,.jpeg' })
  const { refreshQuery } = useRefreshQuery()
  const { closeModalDrawer } = useModalDrawer()

  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)
  const [loading, setLoading] = useState(false)
  console.log({ typeFile, refreshQuery, loading, setLoading, closeModalDrawer })

  useEffect(() => {
    const initData = {
      icon: item?.icon || '',
      lang: item?.lang || {
        vn: '',
        en: '',
      },
      keyName: item?.keyName || '',

      isShow: typeof item?.isShow === 'undefined' ? true : !!item?.isShow,
    }
    setFormData(initData)
  }, [item])

  console.log({ item })

  const onChangeName = (key: string, value?: string) => {
    setFormData({
      ...formData,
      lang: {
        ...formData?.lang,
        [key]: value,
      },
    })
  }

  const handleSubmit = async () => {}

  return (
    formData && (
      <MyForm
        onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
        formData={formData}
        onFinish={handleSubmit}
        className="!overflow-auto gap-2"
      >
        <div className="flex flex-col gap-2 w-full flex-1 overflow-y-auto ">
          <InputForm
            classFromItem="w-full "
            name="keyName"
            label={'keyName'}
            required
            disable={!!item}
          />

          {Object.values(LANGUAGE_SUPPORT).map((value) => {
            return (
              <div key={value} className="flex flex-col  w-full gap-2 mt-2">
                <div>{`${translate('language')} : ${uppercase(value)}`}</div>
                <MyInput
                  value={formData?.lang[value] || ''}
                  onChangeText={(e) => onChangeName(value, e?.toString())}
                />
              </div>
            )
          })}
        </div>
      </MyForm>
    )
  )
}

export default SubCategoriesConfig