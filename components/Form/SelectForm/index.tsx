import { PropsSelectItem } from '@/components/MySelect'
import useLanguage from '@/hook/useLanguage'
import { Form, Select, SelectProps } from 'antd'
import React from 'react'
import styled from 'styled-components'
const FormItem = styled(Form.Item)`
  margin-bottom: 0px !important;
  padding-bottom: 17px !important;
  .ant-form-item-row {
    flex-direction: column !important;
    .ant-form-item-label {
      text-align: start !important;
    }
  }
  .ant-form-item-label {
    padding: 0px !important;
  }
  /* .ant-col {
    min-height: auto !important;
  } */
`
type InputFormType = {
  label?: string
  name?: string
  message?: string
  required?: boolean
  options: Array<PropsSelectItem> | undefined
  configSelect?: SelectProps
  validator?: (value?: any) => string | null
  loading?: boolean
  showSearch?: boolean
  optionFilterProp?: string
  mode?: any
  disabled?: boolean
}

const SelectForm = ({
  label,
  name,
  message,
  required = false,
  options = [],
  validator = () => '',
  configSelect,
  loading = false,
  showSearch = false,
  optionFilterProp = 'any',
  mode = null,
  disabled = false,
}: InputFormType) => {
  const { translate } = useLanguage()
  return (
    <FormItem
      label={label}
      name={name}
      rules={[
        {
          required: required,
          validator: (_, value) => {
            const errorCheck = validator(value)
            if (errorCheck) {
              return Promise.reject(new Error(errorCheck))
            }
            if (!value) {
              return Promise.reject(new Error(message || translate('errors.empty')))
            }

            return Promise.resolve(null)
          },
        },
      ]}
    >
      <Select
        mode={mode}
        disabled={disabled}
        showSearch={showSearch}
        optionFilterProp={optionFilterProp}
        loading={loading}
        className='w-full'
        options={options}
        {...configSelect}
      />
    </FormItem>
  )
}

export default SelectForm
