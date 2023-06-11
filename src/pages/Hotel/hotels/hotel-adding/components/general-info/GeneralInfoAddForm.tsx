import { AppContext } from "@/App"
import AddressSelectorGroup from "@/components/common/AddressSelectorGroup"
import FormItem from "@/components/common/FormItem"
import InputField from "@/components/common/InputField"
import SelectorField from "@/components/common/SelectorField"
import useUser from "@/hooks/useUser"
import { getHotelAmenities, getHotelStyles } from "@/service/api/hotel"
import { createLocationAPI } from "@/service/api/location/createLocation.api"
import { getAccessTokenFromLocal } from "@/utils/localStorage"
import { trimmedObject } from "@/utils/reusable"
import { Form, Input, Rate, message, notification } from "antd"
import { useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface FormValues {
  name: string
  categories: string[]
  isHotel: string
  countryId: string
  provinceId: string
  districtId: string
  wardId: string
  streetAddress: string
  description: string
}

interface GeneralInfoAddFormProps {
  updateCurrentStep: (current: number) => void
}

const GeneralInfoAddForm = ({ updateCurrentStep }: GeneralInfoAddFormProps) => {
  const userInfo = useUser()
  const [form] = Form.useForm()

  const { setLoading, setCurrentRoute, openNotification } =
    useContext(AppContext)
  const currentLocation = useLocation()
  const navigator = useNavigate()

  useEffect(() => {
    updateCurrentStep?.(0)
  }, [])

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
        const { description, ...rest } = values
        const data = trimmedObject({
          ...rest,
          description: description || "",
          isHotel: "true",
          categories: ["c8bdc9ff-d866-4a99-baee-ffc0e3938458"],
        })
        Object.keys(data).forEach((key) => {
          if (data[key]) {
            formData.append(key, data[key])
          }
        })
        const createdLocation = await createLocationAPI(formData)
        setLoading(false)
        message.success(
          "Your changes have been saved! Let head to the next step!!!"
        )
        setTimeout(() => {
          navigator(
            `/hotels/create-hotel/general-info?id=${createdLocation?.hotel?.id}`,
            {
              replace: true,
            }
          )
          navigator(
            `/hotels/create-hotel/create-rooms?id=${createdLocation?.hotel?.id}`
          )
        }, 1000)
      } catch (error: any) {
        setLoading(false)
        message.error(error)
      }
    }
  }
  return (
    <Form className="w-full px-[10rem]" onFinish={handleSubmit} form={form}>
      <FormItem
        name={"name"}
        label="What's your hotel's name?"
        message="Please enter your hotel's name"
        required
        trim
        initialValue={
          userInfo ? `${userInfo.firstName} ${userInfo.lastName}'s hotel` : ""
        }
      >
        <InputField placeholder="Hotel's name" />
      </FormItem>
      <Form.Item name={"hotelClass"} label="Hotel class" initialValue={0}>
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
        required
        initialValue={userInfo?.phoneNumber}
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
        required
        initialValue={userInfo?.email}
      >
        <InputField placeholder="abcHotel@gmail.com" />
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
      <FormItem name={"description"} label="Description">
        <Input.TextArea placeholder="Description" />
      </FormItem>
      <Input
        type="submit"
        value="Save & Next step"
        className="cursor-pointer shadow-none text-white bg-black hover:bg-black/70 border-none py-2"
      />
    </Form>
  )
}

export default GeneralInfoAddForm
