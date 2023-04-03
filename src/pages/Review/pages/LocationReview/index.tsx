import { AppContext } from "@/App"
import { LocationTypo } from "@/components/common/LocationTypo"
import useUser from "@/hooks/useUser"
import LocationReview from "@/interfaces/LocationReview"
import getAllTripType from "@/utils/getAllTripType"
import {
  createImageReviewAPI,
  createUserReviewAPI,
  getLocationReviewById,
} from "@/utils/http"
import {
  DatePicker,
  Form,
  Input,
  message,
  Rate,
  Select,
  UploadProps,
} from "antd"
import Dragger from "antd/lib/upload/Dragger"
import { useContext, useEffect, useState } from "react"
import { BsCloudUploadFill } from "react-icons/bs"
import { useParams } from "react-router-dom"

interface LocationReviewProps { }

export default function LocationReviewPage({ ...props }: LocationReviewProps) {
  const user = useUser()
  const { id } = useParams()
  const { setLoading } = useContext(AppContext)
  const [location, setLocation] = useState<LocationReview>({
    id: "",
    address: {
      country: "",
      province: "",
      district: "",
      street_address: "",
    },
    name: "",
    rating: "",
    category: {
      id: "",
      name: "",
    },
    price_level: 0,
    description: "",
  })
  const [tripTypes, setTripTypes] = useState<{ id: string; name: string }[]>(
    []
  )

  const uploadProps: UploadProps = {
    name: "file",
    listType: "picture",
    beforeUpload(file: any) {
      return false
    },
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const location = await getLocationReviewById(id as string)
        setLocation(location)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        message.error(error.message)
      }
    }
    fetchData()
  }, [])

  const handleFormSubmit = async (values: any) => {
    const { images, ...rest } = values
    const data = {
      ...rest,
      trip_time: values.trip_time.format("YYYY-MM-DD"),
      rating: String(values.rating),
      location_id: id as string,
      user_id: user?.id,
    }
    setLoading(true)
    try {
      const reviewRes = await createUserReviewAPI(data)
      images.fileList.forEach(async (file: any) => {
        const imageFormData = new FormData()
        imageFormData.append("review_id", reviewRes.id)
        imageFormData.append("image", file.originFileObj)
        console.log(imageFormData)

        const imageRes = await createImageReviewAPI(imageFormData)
      })
      setLoading(false)
      message.success("Review created successfully")
    } catch (error: any) {
      setLoading(false)
      message.error(error.message || "Something went wrong")
    }
  }

  return (
    <div className="location-review px-[2rem]">
      <div className="location-review__header flex flex-col mb-4">
        <h1 className="text-2xl font-bold">{location.name}</h1>
        <LocationTypo
          country={location.address.country}
          province={location.address.province}
          district={location.address.district}
          street_address={location.address.street_address}
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
          name={"trip_type_id"}
          label="Trip Type"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please input your trip type!",
            },
          ]}
        >
          <Select
            allowClear
            placeholder="Select your trip type"
            options={tripTypes}
            onFocus={() => getAllTripType(setTripTypes)}
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
          name={"trip_time"}
          label="Trip Time"
          colon={false}
          rules={[
            {
              required: true,
              message: "Please input trip time!",
            },
          ]}
        >
          <DatePicker format={"DD-MM-YYYY"} />
        </Form.Item>
        <Form.Item name="images">
          <Dragger {...uploadProps} className="max-h-[15rem]">
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
  )
}
