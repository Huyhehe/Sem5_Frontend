import useUser from "@/hooks/useUser"
import UserInfo from "@/interfaces/UserInfo"
import { getFullAddressAPI, getUserAPI } from "@/utils/http"
import { getFirstCharacterOfName } from "@/utils/reusable"
import { Tooltip } from "antd"
import { FunctionComponent, useEffect, useState } from "react"
import { AiFillEdit, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import { BsCalendar2Week } from "react-icons/bs"
import { FaLocationArrow } from "react-icons/fa"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { TbEdit } from "react-icons/tb"
import "./styles/index.css"
import { RiMapPinAddLine } from "react-icons/ri"

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
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

  const navigator = useNavigate()
  const user = useUser()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserAPI(user.id)
        setUserInfo(response)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  const handleEditButtonClick = () => {
    navigator("/edit-profile")
  }
  return (
    <div className="profile flex flex-col w-full gap-8">
      <div className="general-info-container flex flex-col shadow-custom px-4 rounded-md">
        <div className="main-display flex py-4">
          <div className="profile-picture-container">
            {userInfo?.profile_picture ? (
              <img
                src={userInfo?.profile_picture}
                alt="profile picture"
                className="profile-picture"
              />
            ) : (
              <div className="profile-picture">
                {getFirstCharacterOfName(
                  userInfo?.first_name,
                  userInfo?.last_name
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between px-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">
                {userInfo?.first_name} {userInfo?.last_name}
              </span>
              <span className="text-sm text-gray-500">
                {"#" + userInfo?.username}
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
              <div className="flex gap-2 items-center">
                <FaLocationArrow />
                <span>
                  {userInfo?.address.province}, {userInfo?.address.district},
                  {userInfo?.address.country}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <BsCalendar2Week />
                <span>{`Joined on ${
                  userInfo?.created_at || "1-11-1111"
                }`}</span>
              </div>
              <div className="">
                {userInfo?.about || (
                  <div className="cursor-pointer flex gap-2 items-center hover:text-gray-600">
                    <AiOutlinePlus />
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
                <span>Review a place you've been to</span>
              </div>
              <div className="flex gap-2 items-center cursor-pointer hover:text-gray-600">
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
    </div>
  )
}

export default Profile
