import { showNotificationError } from '@/utils/notification'
import { getBase642, getBase64 as getBase64Base } from '../utils/functions'
import useLanguage from './useLanguage'

const useBase64Img = (maxSizeOutputKB = 15) => {
  const { translate } = useLanguage()

  const reduceImageSize = (
    imageFile: File,
    maxSizeInKB = 5,
    quality = 0.7,
    callback: any
  ) => {
    const reader = new FileReader()
    reader.readAsDataURL(imageFile)
    reader.onload = (event) => {
      const imgElement = document.createElement('img')
      imgElement.src = event.target?.result + ''
      imgElement.onload = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        // Adjust canvas size to reduce the dimensions of the image
        const MAX_WIDTH = 200 // Adjust width as needed
        const scaleSize = MAX_WIDTH / imgElement.width
        canvas.width = MAX_WIDTH
        canvas.height = imgElement.height * scaleSize
        context?.drawImage(imgElement, 0, 0, canvas.width, canvas.height)

        const compressImage = (currentQuality: any) => {
          canvas.toBlob(
            (blob: any) => {
              if (blob.size / 1024 < maxSizeInKB) {
                // If the compressed image is under the desired size, return it
                callback(blob)
              } else if (currentQuality > 0.1) {
                // If the image is still too large, compress further by reducing quality
                compressImage(currentQuality - 0.1)
              } else {
                // If we've reduced quality too much, return the lowest quality version
                callback(blob)
              }
            },
            'image/jpeg',
            currentQuality
          )
        }

        // Start compressing with initial quality
        compressImage(quality)
      }
    }
  }

  const getBase64 = async (fileUpload: any, callBack: any) => {
    try {
      if (fileUpload.size > 30 * 1048576) {
        const text = translate('warning.maxSizeFile').replace('{size}', `30 MB`)
        showNotificationError(text)
        return
      }

      reduceImageSize(fileUpload, maxSizeOutputKB, 1, (file: any) => {
        getBase642(file, async (base64: any) => {
          callBack({
            base64: base64,
            name: fileUpload.name,
          })
        })
      })
    } catch (error) {
      showNotificationError(translate('errors.file'))
      return null
    }
  }

  const getBase64Full = async (fileUpload: any, callBack: any) => {
    try {
      if (fileUpload.size > 30 * 1048576) {
        const text = translate('warning.maxSizeFile').replace('{size}', `30 MB`)
        showNotificationError(text)
        return
      }

      getBase64Base(fileUpload, callBack)
    } catch (error) {
      showNotificationError(translate('errors.file'))
      return null
    }
  }

  return {
    getBase64,
    getBase64Full,
  }
}

export default useBase64Img
