import { AppContext } from "@/App"
import useUser from "@/hooks/useUser"
import UserReview from "@/interfaces/UserReview"
import getAllTripType from "@/utils/getAllTripType"
import {
  createImageReviewAPI,
  deleteImageReviewAPI,
  getReviewByReviewId,
  updateReviewAPI,
} from "@/utils/http"
import {
  DatePicker,
  Form,
  FormInstance,
  Input,
  message,
  Rate,
  Select,
  UploadProps,
} from "antd"
import dayjs from "dayjs"
import Dragger from "antd/lib/upload/Dragger"
import { useContext, useLayoutEffect, useRef, useState } from "react"
import { BsCloudUploadFill } from "react-icons/bs"
import { MdDelete } from "react-icons/md"
import { useParams } from "react-router-dom"

export const EditPage = () => {
  const { id } = useParams()
  const user = useUser()
  const { setLoading } = useContext(AppContext)
  const [userReview, setUserReview] = useState<UserReview | null>(null)
  const [imageList, setImageList] = useState<any[]>([])
  const formRef = useRef<FormInstance>(null)
  const [tripTypes, setTripTypes] = useState<{ id: string; name: string }[]>([])
  const uploadProps: UploadProps = {
    name: "file",
    listType: "picture",
    beforeUpload(file: any) {
      return false
    },
  }

  useLayoutEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const res = await getReviewByReviewId(id as string)
        getAllTripType(setTripTypes)
        setUserReview(res)
        setImageList(res.images || [])
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
      id: id as string,
    }

    setLoading(true)
    try {
      const reviewRes = await updateReviewAPI(data)
      setLoading(false)
      message.success("Review updated successfully")
    } catch (error: any) {
      setLoading(false)
      message.error(error.message || "Can not update review")
    }
    try {
      images.fileList.forEach(async (file: any) => {
        const imageFormData = new FormData()
        imageFormData.append("review_id", id as string)
        imageFormData.append("image", file.originFileObj)
        const imageRes = await createImageReviewAPI(imageFormData)
        setLoading(false)
      })
    } catch (error: any) {
      setLoading(false)
      message.error("Can not upload image")
    }
  }
  const handleDeleteImage = async (id: string) => {
    setLoading(true)
    try {
      const res = await deleteImageReviewAPI(id)
      setImageList(imageList.filter((image) => image.id !== id))
      setLoading(false)
      message.success("delete image successfully")
    } catch (error: any) {
      setLoading(false)
      message.error(error.message)
    }
  }

  return (
    <div className="review-edit px-8">
      <div className="location-review__header flex flex-col mb-4">
        <h1 className="text-2xl font-bold">{userReview?.title}</h1>
      </div>
      {userReview && (
        <Form onFinish={handleFormSubmit} ref={formRef}>
          <Form.Item
            name="title"
            label="Title"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input your title!" }]}
            required
            initialValue={userReview?.title}
          >
            <Input placeholder="Your trip" />
          </Form.Item>
          <Form.Item
            name={"content"}
            label="Content"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input your content!" }]}
            initialValue={userReview?.content}
          >
            <Input.TextArea placeholder="Your trip description" />
          </Form.Item>
          <Form.Item
            name="trip_type_id"
            label="Trip Type"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input your trip type!" },
            ]}
            initialValue={userReview?.trip_type.id || ""}
          >
            <Select
              allowClear
              placeholder="Select your trip type"
              options={tripTypes}
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
            initialValue={userReview.rating as any as number}
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
            initialValue={dayjs(userReview.trip_time)}
          >
            <DatePicker
              defaultValue={dayjs(userReview.trip_time)}
              format={"DD-MM-YYYY"}
            />
          </Form.Item>
          <div className="image-list flex gap-2 my-2">
            {imageList?.map((image, index) => (
              <div
                className="image-item relative border border-gray-200"
                key={index}
              >
                <img
                  src={image.image}
                  alt=""
                  className="w-[150px] aspect-square object-contain"
                />
                <MdDelete
                  size={25}
                  className="absolute top-2 right-2 cursor-pointer hover:text-primary"
                  onClick={() => handleDeleteImage(image.id)}
                />
              </div>
            ))}
          </div>
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
      )}
    </div>
  )
}
