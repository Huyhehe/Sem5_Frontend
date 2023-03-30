import FormItem from "@/components/common/FormItem"
import InputField from "@/components/common/InputField"
import SelectorField from "@/components/common/SelectorField"
import useProvinces from "@/hooks/useProvinces"
import { District } from "@/interfaces/location/District"
import { Province } from "@/interfaces/location/Province"
import { Ward } from "@/interfaces/location/Ward"
import getAllCategory from "@/utils/getAllCategory"
import { createImageReviewAPI, createLocationAPI } from "@/utils/http"
import {
  convertSnakeToCamelObjectArray,
  currencyFormatter,
  currencyParser,
  trimmedObject,
} from "@/utils/reusable"
import { FormInstance, InputNumber, UploadProps } from "antd"
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
    const data = trimmedObject({
      ...rest,
      description: description || "",
      rating: rating && String(rating),
    })

    try {
      const res = await createLocationAPI(data);
      images.fileList.forEach(async (file: any) => {
        const formData = new FormData();
        formData.append("review_id", res.id);
        formData.append("file", file.originFileObj);
        const imgRes = await createImageReviewAPI(formData);
      });
      message.success(res.success);
    } catch (error: any) {
      message.error(error.message);
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
        <FormItem
          name={"country"}
          label="Country"
          message="Please select country!"
          required
        >
          <SelectorField<Province>
            options={extractData(countries)}
            placeholder="Country"
            onChange={handleCountryChange}
          />
        </FormItem>
        <FormItem
          name={"province"}
          label="Province"
          message="Please select province!"
          required
        >
          <SelectorField<Province>
            options={extractData(provinces)}
            placeholder="Province"
            onChange={handleProvinceChange}
          />
        </FormItem>
        <FormItem
          name={"district"}
          label="District"
          message="Please select district!"
          required
        >
          <SelectorField<District>
            options={extractData(districts)}
            placeholder="District"
            onChange={handleDistrictChange}
          />
        </FormItem>
        <FormItem
          name={"ward"}
          label="Ward"
          labelCol={{ span: 24 }}
          message="Please select ward!"
          required
        >
          <SelectorField<Ward>
            options={extractData(wards)}
            placeholder="Ward"
          />
        </FormItem>
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
  );
}
