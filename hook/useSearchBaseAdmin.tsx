import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, DatePicker } from 'antd'
import dayjs from 'dayjs'
import MyInput from '@/components/MyInput'
import MyRangePicker from '@/components/MyRangePicker'

const dateStart = moment(Date.now()).add(-7, 'days').format('YYYY-MM-DD')
const { RangePicker } = DatePicker

const useSearchBaseAdmin = () => {
  const [dateTime, setDateTime] = useState([
    dateStart,
    moment().format('YYYY-MM-DD'),
  ])

  const [sdt, setSdt] = useState('')
  const [idOther, setIdOther] = useState('')

  const handleSearchSDT = () => {
    setIdOther('')
  }

  const handleSearchIDOther = () => {
    setSdt('')
  }

  const renderContent = () => {
    return (
      <div className="flex  flex-col gap-3">
        <MyRangePicker
          className="md:min-w-[230] min-w-full"
          onChange={(dateString) => setDateTime(dateString)}
        />
        <div className="flex flex-1 gap-3">
          <MyInput
            placeholder="SDT"
            type="string"
            value={sdt}
            onChangeText={(e) => setSdt(e!.toString())}
          />
          <Button type="primary" onClick={handleSearchSDT}>
            Search
          </Button>
        </div>
        <div className="flex flex-1 gap-3">
          <MyInput
            placeholder="Id"
            type="string"
            value={idOther}
            onChangeText={(e) => setIdOther(e!?.toString())}
          />
          <Button type="primary" onClick={handleSearchIDOther}>
            Search
          </Button>
        </div>
      </div>
    )
  }

  return {
    dateTime,
    sdt,
    idOther,
    renderContent,
  }
}

export default useSearchBaseAdmin
