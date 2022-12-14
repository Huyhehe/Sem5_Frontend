import getAllCategory from "@/utils/getAllCategory"
import { Form, Input, Select, Upload, message, Rate } from "antd"
import { useRef, useState } from "react"
import getAllCountry from "@/utils/getAllCountry"
import getAllProvince from "@/utils/getAllProvince"
import type { FormInstance, UploadProps } from "antd"
import getAllDistrict from "@/utils/getAllDistrict"
import { BsCloudUploadFill } from "react-icons/bs"
import { createImageReviewAPI, createLocationAPI } from "@/utils/http"

const { Dragger } = Upload

export const AddLocation = () => {
  const formRef = useRef<FormInstance>(null)
  const [state, setState] = useState({
    countries: [],
    provinces: [],
    districts: [],
    categories: [],
  })
  const { countries, provinces, districts, categories } = state
  const [images, setImages] = useState<any[]>([])
  const uploadProps: UploadProps = {
    name: "file",
    listType: "picture",
    beforeUpload(file: any) {
      setImages((images) => [...images, file])
      console.log(images)
      return false
    },
  }
  const handleSubmit = async (values: any) => {
    const { rating, images, ...rest } = values
    const data = { ...rest }
    data.rating = String(rating)

    try {
      const res = await createLocationAPI(data)
      images.fileList.forEach(async (file: any) => {
        const formData = new FormData()
        formData.append("review_id", res.id)
        formData.append("file", file.originFileObj)
        const imgRes = await createImageReviewAPI(formData)
      })
      message.success(res.success)
    } catch (error: any) {
      message.error(error.message)
    }

    formRef.current?.resetFields()
  }
  return (
    <div className="location-add w-full flex flex-col">
      <Form className="w-full px-[10rem]" onFinish={handleSubmit} ref={formRef}>
        <Form.Item
          name={"name"}
          label="Location Name"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input placeholder="Location name" />
        </Form.Item>
        <Form.Item
          name={"category"}
          label="Category"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please select category!",
            },
          ]}
        >
          <Select
            allowClear
            placeholder="Category"
            options={categories}
            onFocus={() => getAllCategory(state, setState)}
          />
        </Form.Item>
        <Form.Item
          name={"country"}
          label="Country"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please select country!",
            },
          ]}
        >
          <Select
            allowClear
            placeholder="Country"
            options={countries}
            onFocus={() => getAllCountry(state, setState)}
          />
        </Form.Item>
        <Form.Item
          name={"province"}
          label="Province"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please select province!",
            },
          ]}
        >
          <Select
            allowClear
            placeholder="Province"
            options={provinces}
            onFocus={() =>
              getAllProvince(
                state,
                setState,
                formRef?.current?.getFieldValue("country")
              )
            }
          />
        </Form.Item>
        <Form.Item
          name={"district"}
          label="District"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please select district!",
            },
          ]}
        >
          <Select
            allowClear
            placeholder="District"
            options={districts}
            onFocus={() =>
              getAllDistrict(
                state,
                setState,
                formRef?.current?.getFieldValue("province")
              )
            }
          />
        </Form.Item>
        <Form.Item
          name={"street_address"}
          label="Street Address"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please input street address!",
            },
          ]}
        >
          <Input placeholder="Street Address" />
        </Form.Item>
        <Form.Item
          name={"price_level"}
          label="Price Level"
          labelCol={{ span: 24 }}
          initialValue={0}
        >
          <Input placeholder="Price Level" type="number" />
        </Form.Item>
        <Form.Item
          name={"rating"}
          label="Rating"
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
          name={"description"}
          label="Description"
          labelCol={{ span: 24 }}
        >
          <Input.TextArea placeholder="Description" />
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
