import { AppContext } from "@/App"
import AddressSelectorGroup from "@/components/common/AddressSelectorGroup"
import FormItem from "@/components/common/FormItem"
import InputField from "@/components/common/InputField"
import SelectorField from "@/components/common/SelectorField"
import { getHotelAmenities, getHotelStyles } from "@/service/api/hotel"
import { createLocationAPI, getAllCategoryAPI } from "@/utils/http"
import { getAccessTokenFromLocal } from "@/utils/localStorage"
import { trimmedObject } from "@/utils/reusable"
import {
  Form,
  Input,
  Radio,
  Rate,
  Upload,
  UploadProps,
  message,
  notification,
} from "antd"
import { useContext, useState } from "react"
import { BsCloudUploadFill } from "react-icons/bs"
import { useLocation, useNavigate } from "react-router-dom"

const { Dragger } = Upload

interface FormValues {
  name: string
  categories: string[]
  isHotel: boolean
  countryId: string
  provinceId: string
  districtId: string
  wardId: string
  streetAddress: string
  priceLevel: number
  description: string
  images: any
}

export default function AddLocation() {
  const { setLoading, setCurrentRoute, openNotification } =
    useContext(AppContext)
  const currentLocation = useLocation()
  const navigator = useNavigate()
  const [form] = Form.useForm()
  const [, setImages] = useState<any[]>([])
  const [isHotel, setIsHotel] = useState(false)
  const uploadProps: UploadProps = {
    name: "file",
    listType: "picture",
    beforeUpload(file: any) {
      setImages((images) => [...images, file])
      return false
    },
  }

  const validateValidUser = (
    helperText = "Something has to be checked again"
  ) => {
    const accessToken = getAccessTokenFromLocal()
    setCurrentRoute(currentLocation.pathname)
    if (!accessToken) {
      openNotification("warning", {
        message: "Warning",
        description: (
          <div className="flex flex-col">
            <span>{helperText}</span>
            <span
              className="font-bold underline cursor-pointer"
              onClick={() => {
                navigator("/login/signIn")
                notification.destroy()
              }}
            >
              Sign in
            </span>
          </div>
        ),
      })
      return false
    }
    return true
  }

  const handleSubmit = async (values: FormValues) => {
    if (validateValidUser("You have to sign in to add location!")) {
      try {
        setLoading(true)
        const formData = new FormData()
        const { images, description, ...rest } = values
        if (images?.fileList?.length > 0) {
          for (const file of images?.fileList) {
            formData.append("images", file.originFileObj)
          }
        }

        const data = trimmedObject({
          ...rest,
          description: description || "",
          isHotel: String(isHotel),
        })

        Object.keys(data).forEach((key) => {
          if (data[key]) {
            formData.append(key, data[key])
          }
        })

        await createLocationAPI(formData)

        setLoading(false)
        message.success("This location has been raised successfully!")
        form.resetFields()
      } catch (error: any) {
        setLoading(false)
        message.error(error)
      }
    }
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
            mode="multiple"
            fetchOptions={getAllCategoryAPI}
          />
        </Form.Item>
        <Form.Item name={"isHotel"} label="Location type">
          <Radio.Group
            defaultValue={false}
            onChange={({ target: { value } }) => {
              setIsHotel(value)
            }}
          >
            <Radio value={false}>Normal location</Radio>
            <Radio value={true}>Hotel</Radio>
          </Radio.Group>
        </Form.Item>
        {isHotel && (
          <>
            <Form.Item name={"hotelClass"} label="Hotel class">
              <Rate />
            </Form.Item>
            <Form.Item
              name={"hotelStyleIds"}
              label="Hotel style"
              labelCol={{ span: 24 }}
            >
              <SelectorField
                placeholder="Hotel style"
                mode="multiple"
                fetchOptions={getHotelStyles}
              />
            </Form.Item>
            <Form.Item
              name={"propertyAmenities"}
              label="Amenities"
              labelCol={{ span: 24 }}
            >
              <SelectorField
                placeholder="Amenities"
                mode="multiple"
                fetchOptions={getHotelAmenities}
              />
            </Form.Item>
            <FormItem
              name={"phoneNumber"}
              label="Hotel phone number"
              allowNumberOnly
            >
              <InputField maxLength={10} placeholder="0999 xxx xxx" />
            </FormItem>
            <FormItem
              name={"email"}
              label="Hotel Email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <InputField placeholder="abcHotel@gmail.com" />
            </FormItem>
          </>
        )}
        <AddressSelectorGroup form={form} required />
        <FormItem
          name={"streetAddress"}
          label="Street Address"
          message="Please enter street address!"
          required
        >
          <Input placeholder="Street Address" />
        </FormItem>
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
