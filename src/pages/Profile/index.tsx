import { AppContext } from "@/App"
import AddressSelectorGroup from "@/components/common/AddressSelectorGroup"
import { LocationTypo } from "@/components/common/LocationTypo"
import useUser from "@/hooks/useUser"
import { updateAccountInfo } from "@/service/api/user"
import { UserInfoResponse } from "@/types/responses"
import { getAccount, updateProfileImageAPI } from "@/utils/http"
import { getFirstCharacterOfName } from "@/utils/reusable"
import Form from "antd/es/form"
import Input from "antd/es/input"
import message from "antd/es/message"
import Modal from "antd/es/modal"
import Tooltip from "antd/es/tooltip"
import Upload, { UploadProps } from "antd/es/upload"
import { useContext, useEffect, useState } from "react"
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai"
import { BsCalendar2Week, BsCloudUploadFill } from "react-icons/bs"
import { HiOutlinePhotograph } from "react-icons/hi"
import { RiMapPinAddLine } from "react-icons/ri"
import { TbEdit } from "react-icons/tb"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import "./styles/index.css"
import { checkValidParamForUpdateUser, convertUndefinedToNull } from "./utils"

const { Dragger } = Upload

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
  profileImage: "",
  coverImage: "",
  about: "",
  role: "",
  isSale: true,
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

  const user = useUser()
  const navigator = useNavigate()
  const [userInfo, setUserInfo] = useState<UserInfoResponse>(initialUserInfo)
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false)
  const [openImageModal, setOpenImageModal] = useState<boolean>(false)
  const [image, setImage] = useState<any>(null)
  // const formRef = useRef<FormInstance>(null)
  const { setLoading } = useContext(AppContext)

  const [form] = Form.useForm()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getAccount()
        setUserInfo(response)
      } catch (error: any) {
        console.log(error)
        message.error(error)
      }
    }
    getUser()
  }, [])

  const getCreatedDate = (date: string) => {
    return (
      date !== "" &&
      new Date(date)
        .toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
        .replace(/\//g, "-")
    )
  }

  const handleEditButtonClick = () => {
    // navigator("/edit-profile")
    setOpenProfileModal(true)
  }
  const handleEditImageClick = () => {
    setOpenImageModal(true)
  }
  const handleUploadImage = async () => {
    if (image) {
      setLoading(true)
      try {
        const formData = new FormData()
        formData.append("id", user.id)
        formData.append("profileImage", image)
        const response = await updateProfileImageAPI(formData)
        setUserInfo((prev) => ({ ...prev, profileImage: response }))
        setOpenImageModal(false)
        setLoading(false)
        message.success("Image uploaded successfully")
      } catch (error: any) {
        message.error(error.response.data.message)
      }
    }
  }
  const handleEditProfileSave = () => {
    form.submit()
  }
  const handleFormSubmit = async (values: any) => {
    setLoading(true)
    try {
      const validValues = checkValidParamForUpdateUser(values, userInfo)
      const reFormattedData = convertUndefinedToNull(validValues)
      const res = await updateAccountInfo(reFormattedData)
      setUserInfo(res)

      setLoading(false)
      message.success("Profile updated successfully")
      setOpenProfileModal(false)
    } catch (error: any) {
      setLoading(false)
<<<<<<< Updated upstream
      message.error(error.response.data.message)
=======
      message.error(error.response.message)
>>>>>>> Stashed changes
    }
  }

  const props: UploadProps = {
    name: "file",
    listType: "picture",
    maxCount: 1,
    beforeUpload(file: any) {
      setImage(file)
      return false
    },
  }

  return (
    <div className="profile flex flex-col w-full gap-8">
      <div className="general-info-container flex flex-col shadow-custom px-4 rounded-md">
        <div className="main-display flex py-4">
          <div className="profile-picture-container">
            {userInfo?.profileImage ? (
              <img
                src={userInfo?.profileImage}
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
                onClick={handleEditButtonClick}
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
                country={userInfo.address?.country.name}
                province={userInfo.address?.province.name}
                district={userInfo.address?.district.name}
                ward={userInfo.address?.ward.name}
                streetAddress={userInfo.address?.streetAddress}
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
        <div className="detail-info-right flex-grow">
          <Outlet context={{ userInfo, setUserInfo }} />
        </div>
      </div>
      <Modal
        open={openProfileModal}
        width={800}
        onCancel={() => setOpenProfileModal(false)}
        onOk={handleEditProfileSave}
        okText="Save"
      >
        <div className="main-modal-container flex">
          <div className="modal-image-edit w-[30%]">
            <div className="image-container">
              <div className="image-mask">
                <div
                  className="image-mask-layer"
                  onClick={handleEditImageClick}
                >
                  <HiOutlinePhotograph size={30} className="text-white" />
                  <span className="text-white">Upload a photo</span>
                </div>
                {userInfo?.profileImage ? (
                  <img
                    src={userInfo?.profileImage}
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
          </div>
          <div className="modal-info-edit justify-self-stretch flex-grow mr-4">
            <Form onFinish={(values) => handleFormSubmit(values)} form={form}>
              <div className="flex gap-2">
                <Form.Item
                  name={"firstName"}
                  label="First name"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                  initialValue={userInfo?.firstName || ""}
                >
                  <Input allowClear placeholder="First name" />
                </Form.Item>
                <Form.Item
                  name={"lastName"}
                  label="Last name"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}
                  initialValue={userInfo?.lastName || ""}
                >
                  <Input min={1} allowClear placeholder="Last name" />
                </Form.Item>
              </div>
              <Form.Item
                name={"username"}
                label="Username"
                labelCol={{ span: 24 }}
                initialValue={userInfo?.account.username || ""}
              >
                <Input allowClear placeholder="Username" />
              </Form.Item>
              <Form.Item
                name={"phoneNumber"}
                label="Phone number"
                labelCol={{ span: 24 }}
                initialValue={userInfo?.phoneNumber || ""}
              >
                <Input allowClear placeholder="Phone number" />
              </Form.Item>
              <AddressSelectorGroup userInfo={userInfo} form={form} />
              <Form.Item
                name={"streetAddress"}
                label="Street address"
                labelCol={{ span: 24 }}
                initialValue={userInfo?.address?.streetAddress}
              >
                <Input allowClear placeholder="Street address" />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
      <Modal
        open={openImageModal}
        width={700}
        onCancel={() => setOpenImageModal(false)}
        okText="Upload"
        onOk={handleUploadImage}
      >
        <Dragger {...props}>
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
      </Modal>
    </div>
  )
}

export default Profile
