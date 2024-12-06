import React, { useRef, useState } from 'react'
import MyCollapse, { ItemCollapseProps } from '@/components/MyCollapse'
import { Button, Input, Select } from 'antd'
import useLanguage from '@/hook/useLanguage'
import { DeleteOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { cloneData } from '@/utils/functions'
import useModalAdmin from '@/hook/useModalAdmin'
import ModalDelete from '@/components/ModalDelete'
import { VALUE_KEY_DEFAULT } from '@/constant/admin'
import { PropsSelectItem } from '@/components/MySelect'

export type IEditItemAttributesProps = {
  data: any
  onChange: (param?: any) => void
  keyIndex?: string
}

const SelectHasAdd = ({ value, onChange, handleAddNew, options }: any) => {
  const { translate } = useLanguage()
  const inputRef = useRef(null)
  const [newValue, setNewValue] = useState('')

  const handleAddNewItem = async () => {
    setNewValue('')
    handleAddNew(newValue)
  }

  return (
    <Select
      className='min-w-[200px]'
      value={value}
      onChange={(e) => onChange(e)}
      options={options}
      dropdownRender={(menu: any) => (
        <>
          {menu}
          <div className='flex flex-col gap-2 mt-2'>
            <Input
              // placeholder={translate('textPopular.size')}
              ref={inputRef}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              className='flex-1'
            />
            <Button type='text' icon={<PlusOutlined />} onClick={handleAddNewItem}>
              {translate('common.addNew')}
            </Button>
          </div>
        </>
      )}
    />
  )
}

const AttributeShoes = ({ data, onChange, keyIndex = '' }: IEditItemAttributesProps) => {
  const { translate } = useLanguage()
  const { openModal } = useModalAdmin()

  const [optionKeyValues, setOptionKeyValues] = useState<PropsSelectItem[]>(
    VALUE_KEY_DEFAULT.sizes.map((e) => ({
      label: translate(`admin.color.${e}`),
      value: e,
    })),
  )

  const onChangeValueData = (indexParent: number, index: number, key: string, value: any) => {
    const dataClone = cloneData(data)
    dataClone.value[indexParent].colors[index][key] = value
    onChange(dataClone)
  }

  const handleDeleteValueData = (indexParent: number, index: number) => {
    const callBack = () => {
      const dataClone = cloneData(data)
      dataClone.value[indexParent].colors = dataClone.value[indexParent].colors.filter(
        (_: any, indexFilter: number) => indexFilter !== index,
      )
      onChange(dataClone)
    }
    openModal({
      body: <ModalDelete isAdmin callback={callBack} />,
    })
  }

  const handleAddValueData = (indexParent: number) => {
    const dataClone = cloneData(data)
    dataClone.value[indexParent].colors.push({
      color: `color-${dataClone.value[indexParent].colors.length}`,
      amount: '1',
    })
    onChange(dataClone)
  }

  const handleDeleteKeyValueData = (index: number) => {
    const callBack = () => {
      const dataClone = cloneData(data)
      dataClone.value = dataClone.value.filter((_: any, indexFilter: number) => index !== indexFilter)
      onChange(dataClone)
    }
    openModal({
      body: <ModalDelete isAdmin callback={callBack} />,
    })
  }

  const onChangeKeyData = (indexParent: number, value: string) => {
    const dataClone = cloneData(data)
    dataClone.value[indexParent].size = value
    onChange(dataClone)
  }

  const onChangeKey = (value: string) => {
    const dataClone = cloneData(data)
    dataClone.key = value
    onChange(dataClone)
  }

  const handleAddNewKey = () => {
    const dataClone = cloneData(data)
    dataClone.value.push({
      size: 0,
      colors: [
        {
          color: 'none',
          amount: 1,
        },
      ],
    })
    onChange(dataClone)
  }

  const handleDeleteKey = () => {
    const callBack = () => {
      onChange(null)
    }

    openModal({
      body: <ModalDelete isAdmin callback={callBack} />,
    })
  }

  const renderValue = (val: any, index: number) => {
    const key = val['size']
    const value = val['colors']
    const items: ItemCollapseProps = [
      {
        key: `renderValue-${index}`,
        label: <div>{`Size : ${key}`} </div>,
        children: (
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <Input className='!w-[200px]' value={key} onChange={(e) => onChangeKeyData(index, e.target.value)} />
              <div className='text-green-600 text-xl'>
                <PlusCircleOutlined onClick={() => handleAddValueData(index)} className='cursor-pointer' />
              </div>
              <div className='text-red-500 text-xl'>
                <DeleteOutlined onClick={() => handleDeleteKeyValueData(index)} className='cursor-pointer' />
              </div>
            </div>
            <div>List data :</div>
            {value.map((valeDetail: any, indexDetail: number) => {
              return (
                <div key={`valeDetail-${indexDetail}`} className='flex gap-2 items-center'>
                  <div className='flex flex-col gap-1'>
                    <div>{`Color ${indexDetail + 1}`}</div>
                    <SelectHasAdd
                      options={optionKeyValues}
                      value={valeDetail['color']}
                      onChange={(e: string) => onChangeValueData(index, indexDetail, 'color', e)}
                      handleAddNew={(e: string) => {
                        const dataTemp: PropsSelectItem = {
                          label: e,
                          value: e,
                        }
                        setOptionKeyValues([...optionKeyValues, dataTemp])
                      }}
                    />
                    {/* <Input
                      onChange={(e) => onChangeValueData(index, indexDetail, 'color', e.target.value)}
                      value={valeDetail['color']}
                    /> */}
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div>{translate('textPopular.amount')}</div>
                    <Input
                      onChange={(e) => onChangeValueData(index, indexDetail, 'amount', e.target.value)}
                      value={valeDetail['amount']}
                    />
                  </div>
                  <div className='flex text-xl text-red-600 flex-col justify-center items-center h-full'>
                    <div className='pb-6 ' />
                    <DeleteOutlined
                      onClick={() => handleDeleteValueData(index, indexDetail)}
                      className='cursor-pointer'
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ),
      },
    ]

    return <MyCollapse items={items} className='!bg-[#f3efef]' />
  }

  const renderKey = () => {
    const items: ItemCollapseProps = [
      {
        key: keyIndex,
        label: <div>{data.key} </div>,
        children: (
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className='w-[300px]'>
                <Input value={data.key} onChange={(e) => onChangeKey(e.target.value)} />
              </div>
              <div className='text-green-600 text-xl'>
                <PlusCircleOutlined onClick={handleAddNewKey} className='cursor-pointer' />
              </div>
              <div className='text-red-500 text-xl'>
                <DeleteOutlined onClick={() => handleDeleteKey()} className='cursor-pointer' />
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
              {data.value.map((e: any, index: number) => {
                return renderValue(e, index)
              })}
            </div>
          </div>
        ),
      },
    ]

    return <MyCollapse items={items} className='!bg-[#f3efef]' />
  }

  return renderKey()
}

export default AttributeShoes
