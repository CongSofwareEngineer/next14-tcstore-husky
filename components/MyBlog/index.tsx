import React, { useMemo, useRef } from 'react'

import Paragraph from '@yoopta/paragraph'
import Blockquote from '@yoopta/blockquote'
import Embed from '@yoopta/embed'
import Image from '@yoopta/image'
import Link from '@yoopta/link'
import Callout from '@yoopta/callout'
import Accordion from '@yoopta/accordion'
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists'
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from '@yoopta/marks'
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings'
import Code from '@yoopta/code'
import Table from '@yoopta/table'
import Divider from '@yoopta/divider'
import ActionMenuList, {
  DefaultActionMenuRender,
} from '@yoopta/action-menu-list'
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar'
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool'
import YooptaEditor, { createYooptaEditor } from '@yoopta/editor'
import ClientApi from '@/services/clientApi'
import { PATH_IMG } from '@/constant/mongoDB'
import useBase64Img from '@/hook/useBase64Img'

const TOOLS = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
}

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight]

const MyBlog = ({
  value,
  setValue = () => {},
  disabled = false,
  pathFile = PATH_IMG.Products,
}: {
  value: any
  setValue?: (e: any) => void
  disabled?: boolean
  pathFile?: PATH_IMG
}) => {
  const editor = useMemo(() => createYooptaEditor(), [])
  const selectionRef = useRef(null)

  const { getBase64 } = useBase64Img(500, 500)

  const plugins = useMemo(() => {
    return [
      Paragraph,
      Table,
      Divider.extend({
        elementProps: {
          divider: (props: any) => ({
            ...props,
            color: '#007aff',
          }),
        },
      }),
      Accordion,
      HeadingOne,
      HeadingTwo,
      HeadingThree,
      Blockquote,
      Callout,
      NumberedList,
      BulletedList,
      TodoList,
      Code,
      Link,
      Embed,
      Image.extend({
        options: {
          optimizations: {
            provider: 'cloudinary',
          },
          async onUpload(file: File) {
            const fileImg = await getBase64(file, () => {})

            await ClientApi.uploadImg(fileImg, pathFile)
            return {
              src: fileImg?.base64 || null,
              alt: file.name,
              sizes: {
                width: 300,
                height: 300,
              },
            }
          },
        },
      }),
      // Video.extend({
      //   options: {
      //     onUpload: async (file) => {
      //       const data = await uploadToCloudinary(file, 'video');
      //       return {
      //         src: data.secure_url,
      //         alt: 'cloudinary',
      //         sizes: {
      //           width: data.width,
      //           height: data.height,
      //         },
      //       };
      //     },
      //     onUploadPoster: async (file) => {
      //       const image = await uploadToCloudinary(file, 'image');
      //       return image.secure_url;
      //     },
      //   },
      // }),
      // File.extend({
      //   options: {
      //     onUpload: async (file) => {
      //       const response = await uploadToCloudinary(file, 'auto');
      //       return { src: response.secure_url, format: response.format, name: response.name, size: response.bytes };
      //     },
      //   },
      // }),
    ]
  }, [pathFile])

  const onChange = (newValue: any): any => {
    setValue(newValue)
  }

  return (
    <div className="flex flex-col   w-full  relative">
      <div className="w-full" ref={selectionRef}>
        <YooptaEditor
          editor={editor}
          plugins={plugins}
          tools={TOOLS}
          marks={MARKS}
          selectionBoxRoot={selectionRef}
          value={value}
          onChange={onChange}
          autoFocus
          className="!relative !h-full !w-full !pb-2 cursor-pointer"
          readOnly={disabled}
        />
      </div>
    </div>
  )
}

export default MyBlog