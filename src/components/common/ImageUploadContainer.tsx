import { Button, Spin, UploadProps, message } from "antd"
import Dragger from "antd/es/upload/Dragger"
import { useState } from "react"
import { LoadingOutlined } from "@ant-design/icons"
import { BsCloudUploadFill } from "react-icons/bs"
import ImageItem from "./ImageItem"

interface ImageUploadContainerProps {
  uploadProps?: UploadProps
  upload?: (images: any[]) => Promise<void>
  removeImage?: (url: string) => Promise<void>
  currentImages?: {
    id: string
    imageUrl: string
    imageKey: string
  }[]
}

const ImageUploadContainer = ({
  uploadProps: extendedUploadProps,
  upload,
  removeImage,
  currentImages,
}: ImageUploadContainerProps) => {
  const [files, setFiles] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  const uploadProps: UploadProps = {
    ...extendedUploadProps,
    name: "file",
    listType: "picture",
    multiple: true,
    beforeUpload() {
      return false
    },
    fileList: [...files],
  }

  const handleUploadImage = async () => {
    if (files.length === 0) {
      message.info("Please choose at least one image!")
      return
    }
    try {
      setUploading(true)
      await upload?.(files)
      setUploading(false)
      setFiles([])
    } catch (error: any) {
      setUploading(false)
      message.error(error.message)
    }
  }

  const handleRemoveImage = (imageId: string) => {
    removeImage?.(imageId)
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <Dragger
        {...uploadProps}
        listType="picture"
        onChange={(e) => {
          const { file, fileList } = e
          if (
            fileList.filter((fileItem) => fileItem.name === file.name).length >
            1
          ) {
            message.error("You have already uploaded this image!")
            fileList.pop()
          } else {
            setFiles(fileList)
          }
        }}
      >
        <div className="ant-upload-drag-icon flex justify-center">
          <BsCloudUploadFill size={40} />
        </div>
        <p className="ant-upload-text">
          Click or drag file to this area to load
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <Button
        className="bg-black text-white mb-4 flex items-center justify-center gap-2"
        onClick={handleUploadImage}
        disabled={uploading}
      >
        Submit
        {uploading && (
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 20 }}
                spin
                className="text-white"
              />
            }
          />
        )}
      </Button>
      <div className="flex gap-3 flex-wrap">
        {currentImages?.map((image) => {
          return (
            <ImageItem
              key={image.id}
              src={image.imageUrl}
              onRemoveImage={() => {
                handleRemoveImage(image.id)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ImageUploadContainer
