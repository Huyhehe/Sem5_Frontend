import { AppContext } from "@/App"
import RatePoint from "@/components/common/RatePoint"
import useUser from "@/hooks/useUser"
import UserReview from "@/interfaces/UserReview"
import { getAccessTokenFromLocal } from "@/utils/localStorage"
import {
  getAddressStringWithoutStreetAddress,
  getDateTimeFormatted,
} from "@/utils/reusable"
import { Image, notification, Tooltip } from "antd"
import { FunctionComponent, useContext, useState } from "react"
import { AiFillEdit, AiFillLike, AiOutlineLike } from "react-icons/ai"
import { SlOptionsVertical } from "react-icons/sl"
import { useLocation, useNavigate } from "react-router-dom"

interface UserReviewArticleProps {
  userReview: UserReview
  searchQueryString: string
}

const UserReviewArticle: FunctionComponent<UserReviewArticleProps> = ({
  userReview,
  searchQueryString,
}) => {
  const user = useUser()
  const { openNotification, setCurrentRoute } = useContext(AppContext)
  const navigator = useNavigate()
  const currentLocation = useLocation()

  const [isLiked, setIsLiked] = useState(false) // add logic default isLiked if user liked this review
  const [groupVisible, setGroupVisible] = useState(false)

  const highLightText = (text: string, searchQueryString: string) => {
    const regex = new RegExp(searchQueryString, "gi")
    const parts = text.split(regex)
    const matches = text.match(regex)
    const result = []
    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i])
      if (matches && i < matches.length) {
        result.push(
          <span className="bg-yellow-400" key={i}>
            {matches[i]}
          </span>
        )
      }
    }
    return result
  }
  const handleLikeClick = () => {
    const accessToken = getAccessTokenFromLocal()
    setCurrentRoute(currentLocation.pathname)
    if (!accessToken) {
      openNotification("warning", {
        message: "Warning",
        description: (
          <div className="flex flex-col">
            <span>You need to sign in to like this review</span>
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
    } else {
      setIsLiked(!isLiked)
    }
  }
  const handleEditButtonClick = () => {
    if (userReview.user.account.id !== user.id) {
      openNotification("warning", {
        message: "Warning",
        description: "You cannot edit this review",
      })
    } else {
      navigator(`/review/edit/${userReview.id}`)
    }
  }
  return (
    <div className="UserReviewArticle flex flex-col gap-4">
      <header className="flex justify-between">
        <div className="user-box flex gap-1 items-center">
          <img
            src={userReview.user.profile_picture}
            className="rounded-full w-[50px] aspect-square scale-[80%]"
          />
          <div className="flex flex-col">
            <span className="text-[1rem] font-bold">
              {highLightText(
                userReview.user.account.username,
                searchQueryString
              )}
            </span>
            <span className="text-[0.8rem] text-gray-500">
              {getAddressStringWithoutStreetAddress(userReview.user.address)}
            </span>
          </div>
        </div>
        <div className="tool-box flex items-center">
          <div
            className="like-box flex items-center gap-1 p-1 cursor-pointer rounded-full hover:bg-gray-200"
            onClick={handleLikeClick}
          >
            {isLiked ? (
              <AiFillLike size={25} className="text-primary" />
            ) : (
              <AiOutlineLike size={25} />
            )}
            <span className="text-[0.8rem] text-gray-500">
              {/* {isLiked ? userReview.likes + 1 : userReview.likes} */}
              {isLiked ? 1 : 0}
            </span>
          </div>
          <div className="p-1 cursor-pointer rounded-full hover:bg-gray-200">
            {user && (
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
            )}
          </div>
        </div>
      </header>
      <main className="flex flex-col">
        <RatePoint point={userReview.rating} />
        <span className="text-[1rem] font-bold">
          {highLightText(userReview.title, searchQueryString)}
        </span>
        <p>{highLightText(userReview.content, searchQueryString)}</p>
        <div className="w-[150px] flex justify-center items-center">
          {userReview.images && (
            <Image
              preview={{ visible: false }}
              src={userReview.images[0]?.image}
              className="object-contain aspect-[16/9]"
              onClick={() => setGroupVisible(true)}
            />
          )}
          <div className="hidden">
            <Image.PreviewGroup
              preview={{
                visible: groupVisible,
                onVisibleChange: (vis) => setGroupVisible(vis),
              }}
            >
              {userReview.images?.map((image, index) => {
                return <Image src={image.image} />
              })}
            </Image.PreviewGroup>
          </div>
        </div>
      </main>
      <footer className="flex flex-col">
        <span className="text-[0.75rem] text-gray-500">
          Visited on{" "}
          {getDateTimeFormatted(userReview.trip_time, {
            timeZone: "UTC",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className="text-[0.75rem] text-gray-500">
          Written on {getDateTimeFormatted(userReview.review_date)}
        </span>
      </footer>
    </div>
  )
}

export default UserReviewArticle
