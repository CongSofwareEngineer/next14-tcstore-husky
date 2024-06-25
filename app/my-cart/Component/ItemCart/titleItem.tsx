import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import { Checkbox } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { TitleItemType } from '../../type'
const TR = styled.tr.attrs({ className: 'border-b-2 border-gray-300' })`
  th {
    padding-top: 12px;
    padding-bottom: 12px;
  }
`
const TitleItem = ({
  callBack = () => {},
  dataCart,
  noEdit = false,
}: TitleItemType) => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()

  const [allSelected, setAllSelected] = useState(false)

  const renderDesktop = () => {
    return (
      <thead className="bg-green-100">
        <TR>
          {!noEdit && (
            <th>
              <Checkbox
                checked={allSelected}
                onChange={(e) => {
                  callBack(!allSelected)
                  setAllSelected(e.target.checked)
                }}
              />
            </th>
          )}

          <th>{translate('textPopular.image')}</th>
          <th>{translate('textPopular.nameProduct')}</th>
          <th>{translate('productDetail.price')}</th>
          <th>{translate('textPopular.amount')}</th>
          <th>{translate('textPopular.totalMoney')}</th>
          {!noEdit && <th>{translate('common.delete')}</th>}
        </TR>
      </thead>
    )
  }

  const renderMobile = () => {
    return (
      <thead className="bg-green-100">
        <TR>
          <th colSpan={3} className="p-2 w-5">
            <div className="w-full flex justify-between">
              {!noEdit && (
                <Checkbox
                  checked={allSelected}
                  onChange={(e) => {
                    callBack(!allSelected)
                    setAllSelected(e.target.checked)
                  }}
                >
                  {translate('textPopular.all')}
                </Checkbox>
              )}

              <div>{`
              ${dataCart.length} 
              ${translate('textPopular.product')}`}</div>
            </div>
          </th>
        </TR>
      </thead>
    )
  }
  return isMobile ? renderMobile() : renderDesktop()
}

export default TitleItem
