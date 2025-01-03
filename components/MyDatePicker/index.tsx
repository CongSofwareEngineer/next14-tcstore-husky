import { DatePicker } from 'antd'
import React from 'react'
import { formatDatePicker } from '@/utils/momentFunc'
import dayjs from 'dayjs'
const DATE_START = dayjs(new Date(Date.now()).setDate(new Date().getDate() - 1))

// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

type Props = {
  onChange?: (param?: any) => any
  className?: string
  allowClear?: boolean
  disabled?: boolean
  defaultValue?: any
}

const MyDatePicker = ({
  className,
  onChange = () => {},
  allowClear = true,
  disabled = false,
  defaultValue = DATE_START,
}: Props) => {
  return (
    <DatePicker
      inputReadOnly
      disabled={disabled}
      onChange={(e) => onChange(e)}
      defaultValue={defaultValue ? formatDatePicker(defaultValue) : null}
      className={`w-full ${className}`}
      format={'DD/MM/YYYY'}
      lang='vn'
      allowClear={allowClear}
    />
  )
}

export default MyDatePicker
