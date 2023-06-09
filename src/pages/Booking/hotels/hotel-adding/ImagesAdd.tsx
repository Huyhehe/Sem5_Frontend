import ImageItem from "@/components/common/ImageItem"
import { Hotel } from "@/interfaces/hotel"
import { getHotel } from "@/service/api/hotel"
import {
  removeLocationImageAPI,
  updateLocationAPI,
  uploadLocationImageAPI,
} from "@/service/api/location/createLocation.api"
import { LoadingOutlined } from "@ant-design/icons"
import { Button, Spin, message } from "antd"
import Dragger from "antd/es/upload/Dragger"
import { UploadProps } from "antd/lib/upload/interface"
import { useEffect, useState } from "react"
import { BsCloudUploadFill } from "react-icons/bs"
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom"
import { OutletContextType } from "./outletContext.type"

const ImagesAdd = () => {
  const { updateCurrentStep } = useOutletContext<OutletContextType>()
  const [queryString] = useSearchParams()
  const navigator = useNavigate()
  const [files, setFiles] = useState<any[]>([])
  const [currentHotel, setCurrentHotel] = useState<Hotel>()
  const [uploading, setUploading] = useState(false)

  const uploadProps: UploadProps = {
    name: "file",
    listType: "picture",
    multiple: true,
    beforeUpload() {
      return false
    },
    fileList: [...files],
  }
  const fetchHotel = async () => {
    try {
      const hotel = await getHotel(String(queryString.get("id")))
      setCurrentHotel(hotel)
    } catch (error: any) {
      message.error(error.message)
    }
  }
  useEffect(() => {
    updateCurrentStep(2)
    fetchHotel()
  }, [])

  console.log(currentHotel)

  const handleUploadImage = async () => {
    if (files.length === 0) {
      message.info("Please choose at least one image!")
      return
    }
    try {
      setUploading(true)
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("images", file.originFileObj)
      })
      await uploadLocationImageAPI(String(currentHotel?.location?.id), formData)
      setUploading(false)
      setFiles([])
      fetchHotel()
      message.success("Upload image successfully")
    } catch (error: any) {
      setUploading(false)
      message.error(error.message)
    }
  }

  const handleRemoveImage = async (imageId: string) => {
    try {
      await removeLocationImageAPI(String(currentHotel?.location?.id), imageId)
      fetchHotel()
      message.success("Remove image successfully")
    } catch (error: any) {
      message.error(error.message)
    }
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
        Upload
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
        {currentHotel?.location?.locationImages?.map((image) => {
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
      {Number(currentHotel?.location?.locationImages?.length) > 0 && (
        <Button
          className="w-fit ml-auto border-base text-base hover:bg-base hover:text-white"
          onClick={() => {
            navigator(
              `/hotels/create-hotel/confirm?id=${queryString.get("id")}`
            )
          }}
        >
          Next step
        </Button>
      )}
    </div>
  )
}

export default ImagesAdd
