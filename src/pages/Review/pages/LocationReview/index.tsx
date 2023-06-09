import { AppContext } from "@/App"
import { LocationTypo } from "@/components/common/LocationTypo"
import SelectorField from "@/components/common/SelectorField"
import { Location } from "@/interfaces/location"
import { getLocation } from "@/service/api/location"
import { createLocationReview } from "@/service/api/review"
import { getTripTypes } from "@/service/api/review/getTripTypes.api"
import { DatePicker, Form, Input, message, Rate, UploadProps } from "antd"
import Dragger from "antd/lib/upload/Dragger"
import type { Dayjs as DayjsType } from "dayjs"
import Dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import { BsCloudUploadFill } from "react-icons/bs"
import { useParams } from "react-router-dom"
import Fallback from "../Fallback"
import { CreateReviewRequestType } from "@/types/requests"

export interface ReviewFormValues {
  locationId: string
  title: string
  content: string
  rating: number
  tripTime: DayjsType
  tripTypeId: string
  images: any
}

export default function LocationReviewPage() {
  const { id } = useParams()
  const { setLoading } = useContext(AppContext)
  const [location, setLocation] = useState<Location | null>(null)

  const uploadProps: UploadProps = {
    name: "file",
    listType: "picture",
    multiple: true,
    beforeUpload() {
      return false
    },
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const location = await getLocation(id as string)
        setLocation(location)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleFormSubmit = async (values: ReviewFormValues) => {
    try {
      setLoading(true)
      const { images, tripTime, ...rest } = values
      const data: CreateReviewRequestType = {
        ...rest,
        locationId: String(id),
        tripTime: tripTime.toISOString(),
      }
      const formData = new FormData()
      if (images) {
        for (const file of images?.fileList) {
          formData.append("images", file.originFileObj)
        }
      }
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
      await createLocationReview(formData)
      setLoading(false)
      message.success("Review created successfully!")
      window.location.href = `/search/${id}`
    } catch (error: any) {
      setLoading(false)
      message.error(error)
    }
  }

  return location ? (
    <div className="location-review px-[2rem]">
      <div className="location-review__header flex flex-col mb-4">
        <h1 className="text-2xl font-bold">{location.name}</h1>
        <LocationTypo
          country={location.address?.country?.name}
          province={location.address?.province?.name}
          district={location.address?.district?.name}
          streetAddress={location.address?.streetAddress}
        />
      </div>
      <Form onFinish={handleFormSubmit}>
        <Form.Item
          name={"title"}
          label="Title"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please input review title!",
            },
          ]}
        >
          <Input placeholder="Your Trip" />
        </Form.Item>
        <Form.Item
          name={"content"}
          label="Content"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please input review content!",
            },
          ]}
        >
          <Input.TextArea placeholder="Your trip description" />
        </Form.Item>
        <Form.Item
          name={"tripTypeId"}
          label="Trip Type"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please select your trip type!",
            },
          ]}
        >
          <SelectorField
            allowClear
            placeholder="Select your trip type"
            fetchOptions={getTripTypes}
          />
        </Form.Item>
        <Form.Item
          name={"rating"}
          label="Rating (Rate 0 by default)"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please rate your location!",
            },
          ]}
        >
          <Rate allowHalf />
        </Form.Item>
        <Form.Item
          name={"tripTime"}
          label="Trip Time"
          colon={false}
          rules={[
            {
              required: true,
              message: "Please input trip time!",
            },
          ]}
        >
          <DatePicker
            picker="month"
            disabledDate={(current) =>
              current &&
              (current > Dayjs().endOf("month") ||
                current < Dayjs().subtract(12, "month").endOf("month"))
            }
          />
        </Form.Item>
        <Form.Item name="images">
          <Dragger
            {...uploadProps}
            className="max-h-[15rem]"
            onChange={(e) => {
              const { file, fileList } = e
              if (
                fileList.filter((fileItem) => fileItem.name === file.name)
                  .length > 1
              ) {
                message.error("You have already uploaded this image!")
                fileList.pop()
              }
            }}
          >
            <div className="ant-upload-drag-icon flex justify-center">
              <BsCloudUploadFill size={40} />
            </div>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
        </Form.Item>
        <Input
          type="submit"
          value="Submit"
          className="cursor-pointer shadow-none text-white bg-black hover:bg-black/70 border-none"
        />
      </Form>
    </div>
  ) : (
    <Fallback />
  )
}
