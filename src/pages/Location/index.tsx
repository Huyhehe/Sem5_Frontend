import AddressSelectorGroup from "@/components/common/AddressSelectorGroup"
import FormItem from "@/components/common/FormItem"
import InputField from "@/components/common/InputField"
import SelectorField from "@/components/common/SelectorField"
import getAllCategory from "@/utils/getAllCategory"
import { createImageReviewAPI, createLocationAPI } from "@/utils/http"
import {
  currencyFormatter,
  currencyParser,
  trimmedObject,
} from "@/utils/reusable"
import { Form, Input, InputNumber, Upload, UploadProps, message } from "antd"
import { useState } from "react"
import { BsCloudUploadFill } from "react-icons/bs"

const { Dragger } = Upload

export default function AddLocation() {
  const [form] = Form.useForm()
  const [state, setState] = useState({
    categories: [],
  })
  const { categories } = state
  const [, setImages] = useState<any[]>([])
  const uploadProps: UploadProps = {
    name: "file",
    listType: "picture",
    beforeUpload(file: any) {
      setImages((images) => [...images, file])
      return false
    },
  }

  const handleSubmit = async (values: any) => {
    const { rating, images, description, ...rest } = values
    const data = trimmedObject({
      ...rest,
      description: description || "",
      rating: rating && String(rating),
    })

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

    form.resetFields()
  }

  return (
    <div className="location-add w-full flex flex-col">
      <Form className="w-full px-[10rem]" onFinish={handleSubmit} form={form}>
        <FormItem
          name={"name"}
          label="Location Name"
          message="Please enter your location name"
          required
        >
          <InputField placeholder="Location name" trim />
        </FormItem>
        <FormItem
          name={"category"}
          label="Category"
          message="Please select category!"
          required
        >
          <SelectorField
            placeholder="Category"
            options={categories}
            onFocus={() => getAllCategory(state, setState)}
          />
        </FormItem>
        <AddressSelectorGroup form={form} required />
        <FormItem
          name={"streetAddress"}
          label="Street Address"
          message="Please enter street address!"
          required
        >
          <Input placeholder="Street Address" />
        </FormItem>
        <FormItem name={"priceLevel"} label="Price Level" initialValue={0}>
          <InputNumber
            placeholder="Price Level"
            addonBefore="VND"
            className="w-full"
            min={0}
            formatter={(value) => currencyFormatter(value || 0)}
            parser={currencyParser}
          />
        </FormItem>
        <FormItem name={"description"} label="Description">
          <Input.TextArea placeholder="Description" />
        </FormItem>
        <FormItem name="images">
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
        </FormItem>
        <Input
          type="submit"
          value="Submit"
          className="cursor-pointer shadow-none text-white bg-black hover:bg-black/70 border-none"
        />
      </Form>
    </div>
  )
}
