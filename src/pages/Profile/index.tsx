import { AppContext } from "@/App"
import AddressSelectorGroup from "@/components/common/AddressSelectorGroup"
import FormItem from "@/components/common/FormItem"
import { LocationTypo } from "@/components/common/LocationTypo"
import { updateAccountInfo } from "@/service/api/user"
import { UserInfoResponse } from "@/types/responses"
import {
  getAccount,
  updateCoverImageAPI,
  updateProfileImageAPI,
} from "@/utils/http"
import { getFirstCharacterOfName } from "@/utils/reusable"
import Button from "antd/es/button"
import Form from "antd/es/form"
import Image from "antd/es/image"
import Input from "antd/es/input"
import message from "antd/es/message"
import Modal from "antd/es/modal"
import Spin from "antd/es/spin"
import Tooltip from "antd/es/tooltip"
import Upload, { UploadProps } from "antd/es/upload"
import { Suspense, useContext, useEffect, useState } from "react"
import { AiFillEdit, AiOutlineCloudUpload, AiOutlinePlus } from "react-icons/ai"
import { BsCalendar2Week } from "react-icons/bs"
import { HiOutlinePhotograph } from "react-icons/hi"
import { IoImages } from "react-icons/io5"
import { RiMapPinAddLine } from "react-icons/ri"
import { TbEdit } from "react-icons/tb"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import "./styles/index.css"
import {
  checkValidParamForUpdateUser,
  getCreatedDate,
  isAllowFileType,
} from "./utils"

enum ImageType {
  COVER = "cover",
  PROFILE = "profile",
}

const links = [
  {
    name: "Activity feed",
    to: "",
  },
  {
    name: "Reviews",
    to: "/my-reviews",
  },
  {
    name: "Bookmarks",
    to: "/bookmarks",
  },
  {
    name: "Followers",
    to: "/followers",
  },
  {
    name: "Following",
    to: "/following",
  },
  {
    name: "Business",
    to: "/business",
  },
  {
    name: "My Bookings",
    to: "/my-bookings",
  },
]

const initialUserInfo: UserInfoResponse = {
  accountId: "",
  account: {
    id: "",
    username: "",
    createAt: "",
  },
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  profileImageUrl: "",
  coverImageUrl: "",
  about: "",
  role: "",
  isSale: false,
  address: {
    id: "",
    country: {
      id: "",
      name: "",
      description: "",
    },
    province: {
      id: "",
      name: "",
      description: "",
    },
    district: {
      id: "",
      name: "",
      description: "",
    },
    ward: {
      id: "",
      name: "",
    },
    streetAddress: "",
  },
}

const Profile = () => {
  document.title = "TravelCare | Profile"

  const navigator = useNavigate()
  const [userInfo, setUserInfo] = useState<UserInfoResponse>(initialUserInfo)
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false)
  const { setLoading } = useContext(AppContext)
  const [form] = Form.useForm()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getAccount()
        setUserInfo(response)
      } catch (error: any) {
        message.error(error)
      }
    }
    getUser()
  }, [])

  const handleUploadImage = async (image: File, imageType: ImageType) => {
    if (image) {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append("image", image)
        if (imageType === ImageType.PROFILE) {
          const response = await updateProfileImageAPI(formData)
          setUserInfo((prev) => ({ ...prev, profileImageUrl: response }))
        } else {
          const response = await updateCoverImageAPI(formData)
          setUserInfo((prev) => ({ ...prev, coverImageUrl: response }))
        }
        setLoading(false)
        message.success("Image uploaded successfully")
      } catch (error: any) {
        setLoading(false)
        message.error(error)
      }
    }
  }

  const handleFormSubmit = async (values: any) => {
    setLoading(true)

    try {
      const validValues = checkValidParamForUpdateUser(values, userInfo)
      const res = await updateAccountInfo(validValues)
      setUserInfo(res)

      setLoading(false)
      message.success("Profile updated successfully")
      setOpenProfileModal(false)
    } catch (error: any) {
      setLoading(false)
      message.error(error.response.message)
    }
  }

  const uploadProps: UploadProps = {
    listType: "picture",
    maxCount: 1,
    beforeUpload() {
      return false
    },
    showUploadList: false,
  }

  return (
    <div className="profile flex flex-col w-full mt-[15rem] gap-8 relative">
      <div className="absolute left-[50%] -translate-x-1/2 bottom-[90%] w-[100vw] h-[20rem]">
        {userInfo?.coverImageUrl ? (
          <Image
            wrapperClassName="w-full h-full"
            className="w-full h-full object-cover"
            src={userInfo?.coverImageUrl}
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-[#cdcdcd]">
            <IoImages size={150} className="text-white" />
          </div>
        )}
      </div>
      <div className="general-info-container flex flex-col shadow-custom px-4 rounded-md relative bg-white">
        <div className="main-display flex py-4">
          <div className="profile-picture-container">
            {userInfo?.profileImageUrl ? (
              <Image
                src={userInfo?.profileImageUrl}
                alt="profile picture"
                className="profile-picture aspect-square w-[8rem]"
              />
            ) : (
              <div className="profile-picture">
                {getFirstCharacterOfName(
                  userInfo?.firstName,
                  userInfo?.lastName
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between px-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">
                {userInfo?.firstName} {userInfo?.lastName}
              </span>
              <span className="text-sm text-gray-500">
                {"#" + userInfo?.account?.username}
              </span>
            </div>
            <div className="flex gap-4 xl:gap-8">
              <div className="text-xl font-medium">
                <h4>Contributions</h4>
                <span className="text-gray-400 font-bold">0</span>
              </div>
              <div className="text-xl font-medium">
                <h4>Followers</h4>
                <span className="text-gray-400 font-bold">0</span>
              </div>
              <div className="text-xl font-medium">
                <h4>Following</h4>
                <span className="text-gray-400 font-bold">0</span>
              </div>
            </div>
          </div>
          <div className="tool-box flex ml-auto">
            <Tooltip
              title="Edit profile"
              placement="bottom"
              overlayClassName="rounded-md"
            >
              <AiFillEdit
                size={30}
                className="text-gray-400 hover:text-primary cursor-pointer"
                onClick={() => {
                  setOpenProfileModal(true)
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="main-links flex gap-4">
          {links.map((link, index) => (
            <NavLink
              end
              to={`/profile${link.to}`}
              className={({ isActive }) =>
                isActive ? `profile-link profile-link-active` : `profile-link`
              }
              key={index}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="detail-info-container flex gap-8">
        <div className="detail-info-left w-[25%] flex flex-col gap-4">
          <div className="left-top shadow-custom p-4 rounded-md">
            <h1 className="font-bold text-xl">Intro</h1>
            <div className="intro flex flex-col gap-2 p-3">
              <LocationTypo
                extendClassName="font-medium"
                country={userInfo?.address?.country?.name}
                province={userInfo?.address?.province?.name}
                district={userInfo?.address?.district?.name}
                ward={userInfo?.address?.ward?.name}
                streetAddress={userInfo?.address?.streetAddress}
              />
              <div className="flex gap-2 items-center font-medium">
                <div>
                  <BsCalendar2Week />
                </div>
                <span>{`Joined on ${
                  getCreatedDate(userInfo?.account?.createAt) || "?-??-????"
                }`}</span>
              </div>
              <div className="font-medium">
                {userInfo?.about || (
                  <div className="cursor-pointer flex gap-2 items-center hover:text-gray-600">
                    <div>
                      <AiOutlinePlus />
                    </div>
                    <span>Write something about yourself</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="left-bottom shadow-custom p-4 rounded-md">
            <h1 className="font-bold text-xl">Share your advices</h1>
            <div className="intro flex flex-col gap-2 p-3">
              <div className="flex gap-2 items-center cursor-pointer hover:text-gray-600">
                <TbEdit />
                <span>Review a place you&lsquo;ve been to</span>
              </div>
              <div
                className="flex gap-2 items-center cursor-pointer hover:text-gray-600"
                onClick={() => {
                  navigator("/location-add")
                }}
              >
                <RiMapPinAddLine />
                <span>Add a place</span>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-info-right flex-grow max-w-[72%]">
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-full">
                <Spin size="small" />
              </div>
            }
          >
            <Outlet context={{ userInfo, setUserInfo }} />
          </Suspense>
        </div>
      </div>

      <Modal
        open={openProfileModal}
        width={800}
        onCancel={() => setOpenProfileModal(false)}
        onOk={() => {
          form.submit()
        }}
        okText="Save"
        className="translate-y-[5rem]"
      >
        <div className="main-modal-container flex">
          <div className="modal-image-edit w-[30%] flex flex-col items-center pr-[1.5rem] box-border gap-2">
            <Upload
              {...uploadProps}
              name="profile-image"
              onChange={(info: any) => {
                if (!isAllowFileType(info.file.type)) {
                  return message.error(
                    "File type is not supported, please try again with image file!"
                  )
                }
                handleUploadImage(info.file, ImageType.PROFILE)
              }}
            >
              <div className="image-container">
                <div className="image-mask">
                  <div className="image-mask-layer">
                    <HiOutlinePhotograph size={30} className="text-white" />
                    <span className="text-white">
                      {userInfo.profileImageUrl
                        ? "Update avatar"
                        : "Upload a photo"}
                    </span>
                  </div>
                  {userInfo?.profileImageUrl ? (
                    <img
                      src={userInfo?.profileImageUrl}
                      alt="profile picture"
                      className="profile-picture"
                    />
                  ) : (
                    <div className="profile-picture">
                      {getFirstCharacterOfName(
                        userInfo?.firstName,
                        userInfo?.lastName
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Upload>
            <div className="flex justify-center">
              <Upload
                {...uploadProps}
                name="cover-image"
                onChange={(info: any) => {
                  if (!isAllowFileType(info.file.type)) {
                    return message.error(
                      "File type is not supported, please try again with image file!"
                    )
                  }
                  handleUploadImage(info.file, ImageType.COVER)
                }}
              >
                <Button
                  className="flex justify-center items-center gap-1"
                  icon={<AiOutlineCloudUpload />}
                >
                  Update cover image
                </Button>
              </Upload>
            </div>
          </div>
          <div className="modal-info-edit justify-self-stretch flex-grow mr-4">
            <Form onFinish={handleFormSubmit} form={form}>
              <div className="flex gap-2">
                <FormItem
                  name={"firstName"}
                  label="First name"
                  initialValue={userInfo?.firstName || ""}
                  required
                  trim
                  allowTextOnly
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input allowClear placeholder="First name" />
                </FormItem>
                <FormItem
                  name={"lastName"}
                  label="Last name"
                  initialValue={userInfo?.lastName || ""}
                  required
                  trim
                  allowTextOnly
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}
                >
                  <Input min={1} allowClear placeholder="Last name" />
                </FormItem>
              </div>
              <FormItem label="Username">
                <Input
                  placeholder="Username"
                  disabled
                  value={userInfo?.account.username || ""}
                />
              </FormItem>
              <FormItem
                name={"phoneNumber"}
                label="Phone number"
                initialValue={userInfo?.phoneNumber || ""}
                trim
                allowNumberOnly
              >
                <Input allowClear placeholder="Phone number" />
              </FormItem>
              <AddressSelectorGroup
                defaultValue={userInfo.address}
                form={form}
              />
              <FormItem
                name={"streetAddress"}
                label="Street address"
                initialValue={userInfo?.address?.streetAddress}
              >
                <Input allowClear placeholder="Street address" />
              </FormItem>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Profile
