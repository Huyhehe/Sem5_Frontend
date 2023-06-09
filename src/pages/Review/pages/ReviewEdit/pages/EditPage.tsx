import { AppContext } from "@/App"
import { ReviewImage, UserReview } from "@/interfaces/review"
import { DatePicker, Form, Input, Rate, UploadProps, message } from "antd"
import Dragger from "antd/lib/upload/Dragger"
import Dayjs from "dayjs"
import { useContext, useLayoutEffect, useState } from "react"
import { BsCloudUploadFill } from "react-icons/bs"

import ImageItem from "@/components/common/ImageItem"
import SelectorField from "@/components/common/SelectorField"
import {
  deleteImageReviewAPI,
  getReviewByReviewId,
  getTripTypes,
  updateLocationReview,
} from "@/service/api/review"
import { UpdateReviewRequestType } from "@/types/requests"
import { useParams } from "react-router-dom"
import { LocationTypo } from "@/components/common/LocationTypo"
import Fallback from "../../Fallback"

export default function EditPage() {
  const { id } = useParams()
  const { setLoading } = useContext(AppContext)
  const [userReview, setUserReview] = useState<UserReview | null>(null)
  const [imageList, setImageList] = useState<ReviewImage[]>([])
  const [form] = Form.useForm()
  const uploadProps: UploadProps = {
    name: "file",
    listType: "picture",
    beforeUpload() {
      return false
    },
  }

  const handleSetInitialValues = (initialReview: UserReview) => {
    form.setFieldsValue({
      title: initialReview?.title || "",
      content: initialReview?.content || "",
      rating: initialReview?.rating || 0,
      tripTypeId: initialReview?.tripType?.id || "",
      tripTime: Dayjs(initialReview?.tripTime) || "",
    })
    setImageList(initialReview?.reviewImages || [])
  }

  useLayoutEffect(() => {
    if (id) {
      setLoading(true)
      const fetchData = async () => {
        try {
          const review = await getReviewByReviewId(id)
          setUserReview(review)
          handleSetInitialValues(review)
          setLoading(false)
        } catch (error: any) {
          setLoading(false)
          message.error(error.message)
        }
      }
      fetchData()
    }
  }, [])

  const handleFormSubmit = async (values: any) => {
    try {
      setLoading(true)
      const { images, tripTime, ...rest } = values
      const data: UpdateReviewRequestType = {
        ...rest,
        reviewId: id,
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
      const res = await updateLocationReview(formData)
      setLoading(false)
      message.success("Review updated successfully!")
      window.location.href = `/search/${res.location.id}`
    } catch (error: any) {
      setLoading(false)
      message.error(error)
    }
  }
  const handleRemoveImage = async (imageId: string) => {
    if (userReview) {
      setLoading(true)
      try {
        await deleteImageReviewAPI(userReview?.id, imageId)
        setImageList(imageList.filter((image) => image.id !== imageId))
        setLoading(false)
        message.success("Delete image successfully")
      } catch (error: any) {
        setLoading(false)
        message.error(error.message)
      }
    }
  }

  return userReview ? (
    <div className="review-edit px-8">
      <div className="location-review__header flex flex-col mb-4">
        <h1 className="text-2xl font-bold">{userReview?.location.name}</h1>
        {userReview?.location?.address && (
          <LocationTypo
            country={userReview?.location.address?.country?.name}
            province={userReview?.location.address?.province?.name}
            district={userReview?.location.address?.district?.name}
            streetAddress={userReview?.location.address?.streetAddress}
          />
        )}
      </div>
      <Form onFinish={handleFormSubmit} form={form}>
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
        <div className="flex gap-3 flex-wrap mt-4">
          {imageList?.map((image) => {
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
