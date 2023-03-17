import SelectorField from "@/components/common/SelectorField"
import useProvinces from "@/hooks/useProvinces"
import { District } from "@/interfaces/location/District"
import { Province } from "@/interfaces/location/Province"
import { Ward } from "@/interfaces/location/Ward"
import getAllCategory from "@/utils/getAllCategory"
import { createImageReviewAPI, createLocationAPI } from "@/utils/http"
import { convertSnakeToCamelObjectArray } from "@/utils/reusable"
import type { FormInstance, UploadProps } from "antd"
import { Form, Input, message, Upload } from "antd"
import { useMemo, useRef, useState } from "react"
import { BsCloudUploadFill } from "react-icons/bs"

const { Dragger } = Upload

const extractData = (data: any) => {
  return data?.map((item: any) => {
    return {
      id: item.code,
      ...item,
    }
  })
}

export const AddLocation = () => {
  const locations = useProvinces()

  const Provinces: Province[] = useMemo(() => {
    return (locations && convertSnakeToCamelObjectArray(locations)) || []
  }, [locations])

  const formRef = useRef<FormInstance>(null)
  const [state, setState] = useState({
    countries: [{ id: "VN", name: "Viet Nam" }],
    provinces: [] as Province[],
    districts: [] as District[],
    wards: [] as Ward[],
    categories: [],
  })
  const { countries, provinces, districts, wards, categories } = state
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
    const data = {
      ...rest,
      description: description || "",
      rating: rating && String(rating),
    }

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

  const handleCountryChange = (value: string) => {
    if (value === "VN" && Provinces.length > 0) {
      setState({ ...state, provinces: Provinces })
    }
  }

  const handleProvinceChange = (value: string) => {
    if (provinces.length > 0 && value) {
      const province = provinces.find((item) => String(item.code) === value)
      if (province) {
        setState({ ...state, districts: province.districts })
      }
    }
  }

  const handleDistrictChange = (value: string) => {
    if (districts.length > 0 && value) {
      const district = districts.find((item) => String(item.code) === value)
      if (district) {
        setState({ ...state, wards: district.wards })
      }
    }
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
              message: "Please input the location name!",
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
          <SelectorField
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
          <SelectorField<Province>
            options={extractData(countries)}
            placeholder="Country"
            onChange={handleCountryChange}
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
          <SelectorField<Province>
            options={extractData(provinces)}
            placeholder="Province"
            onChange={handleProvinceChange}
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
          <SelectorField<District>
            options={extractData(districts)}
            placeholder="District"
            onChange={handleDistrictChange}
          />
        </Form.Item>
        <Form.Item
          name={"ward"}
          label="Ward"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please select ward!",
            },
          ]}
        >
          <SelectorField<Ward>
            options={extractData(wards)}
            placeholder="Ward"
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
