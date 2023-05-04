import AddressSelectorGroup from "@/components/common/AddressSelectorGroup"
import FormItem from "@/components/common/FormItem"
import InputField from "@/components/common/InputField"
import SelectorField from "@/components/common/SelectorField"
import { Category } from "@/types/responses"
import { createLocationAPI, getAllCategoryAPI } from "@/utils/http"
import {
  convertDataForSelectOptions,
  currencyFormatter,
  currencyParser,
  trimmedObject,
} from "@/utils/reusable"
import { Form, Input, InputNumber, Upload, UploadProps, message } from "antd"
import { useEffect, useState } from "react"
import { BsCloudUploadFill } from "react-icons/bs"

const { Dragger } = Upload

export default function AddLocation() {
  const [form] = Form.useForm()
  const [categories, setCategories] = useState([])
  const [, setImages] = useState<any[]>([])
  const uploadProps: UploadProps = {
    name: "file",
    listType: "picture",
    beforeUpload(file: any) {
      setImages((images) => [...images, file])
      return false
    },
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategoryAPI()
        const convertedData = convertDataForSelectOptions<Category>(res)
        setCategories(convertedData as never)
      } catch (error: any) {
        message.error(error)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData()
      const { rating, images, description, ...rest } = values
      for (const file of images.fileList) {
        formData.append("images", file.originFileObj)
      }

      const data = trimmedObject({
        ...rest,
        description: description || "",
        rating: rating && String(rating),
      })

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
      await createLocationAPI(formData)
      message.success("This location has been raised successfully!")
    } catch (error: any) {
      message.error(error)
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
          trim
        >
          <InputField placeholder="Location name" />
        </FormItem>
        <Form.Item
          name={"categories"}
          label="Categories"
          rules={[
            {
              required: true,
              message: "Please select at least one category!",
            },
          ]}
          labelCol={{ span: 24 }}
          required
        >
          <SelectorField
            placeholder="Category"
            options={categories}
            mode="multiple"
          />
        </Form.Item>
        <AddressSelectorGroup form={form} required />
        <FormItem
          name={"streetAddress"}
          label="Street Address"
          message="Please enter street address!"
          required
        >
          <Input placeholder="Street Address" />
        </FormItem>
        <Form.Item name={"priceLevel"} label="Price Level" initialValue={0}>
          <InputNumber
            placeholder="Price Level"
            addonBefore="VND"
            className="w-full"
            min={0}
            formatter={(value) => currencyFormatter(value || 0)}
            parser={currencyParser}
          />
        </Form.Item>
        <FormItem name={"description"} label="Description">
          <Input.TextArea placeholder="Description" />
        </FormItem>
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
