import { AppContext } from "@/App"
import { LocationTypo } from "@/components/common/LocationTypo"
import RatePoint from "@/components/common/RatePoint"
import useUser from "@/hooks/useUser"
import { ReviewsByLocationResponse } from "@/types/responses"
import { getAccessTokenFromLocal } from "@/utils/localStorage"
import {
  getAddressStringWithoutStreetAddress,
  getDateTimeFormatted,
} from "@/utils/reusable"
import { Image, notification, Tooltip } from "antd"
import { useContext, useState } from "react"
import { AiFillEdit, AiFillLike, AiOutlineLike } from "react-icons/ai"
import { useLocation, useNavigate } from "react-router-dom"

interface UserReviewArticleProps {
  userReview: ReviewsByLocationResponse
  searchQueryString: string
}

const UserReviewArticle = ({
  userReview,
  searchQueryString,
}: UserReviewArticleProps) => {
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
    // const accessToken = getAccessTokenFromLocal()
    // setCurrentRoute(currentLocation.pathname)
    // if (!accessToken) {
    //   openNotification("warning", {
    //     message: "Warning",
    //     description: (
    //       <div className="flex flex-col">
    //         <span>You need to sign in to like this review</span>
    //         <span
    //           className="font-bold underline cursor-pointer"
    //           onClick={() => {
    //             navigator("/login/signIn")
    //             notification.destroy()
    //           }}
    //         >
    //           Sign in
    //         </span>
    //       </div>
    //     ),
    //   })
    // } else {
    //   setIsLiked(!isLiked)
    // }
    openNotification("warning", {
      message: "Warning",
      description:
        "This feature is not available yet, we're trying to bring it to you as soon as possible",
    })
  }
  const handleEditButtonClick = () => {
    // if (userReview.user.accountId !== user?.accountId) {
    //   openNotification("warning", {
    //     message: "Warning",
    //     description: "You cannot edit this review",
    //   })
    // } else {
    //   navigator(`/review/edit/${userReview.id}`)
    // }
    openNotification("warning", {
      message: "Warning",
      description:
        "This feature is not available yet, we're trying to bring it to you as soon as possible",
    })
  }
  return (
    <div className="UserReviewArticle flex flex-col gap-3">
      <header className="flex justify-between">
        <div className="user-box flex gap-1 items-center">
          <img
            src={userReview.user.profileImageUrl}
            className="rounded-full w-[50px] aspect-square scale-[80%]"
          />
          <div className="flex flex-col">
            <span className="text-[1rem] font-bold">
              {highLightText(
                `${userReview.user.firstName} ${userReview.user.lastName}`,
                searchQueryString
              )}
            </span>
            <span className="text-[0.8rem] text-gray-500">
              {highLightText(
                userReview.user.account.username,
                searchQueryString
              )}
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
          {userReview.reviewImages.length > 0 && (
            <Image
              preview={{ visible: false }}
              src={userReview.reviewImages[0]?.imageUrl}
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
              {userReview.reviewImages?.map((image) => {
                return <Image key={image.imageKey} src={image.imageUrl} />
              })}
            </Image.PreviewGroup>
          </div>
        </div>
      </main>
      <footer className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[0.75rem] text-gray-500">
            Visited{" "}
            {getDateTimeFormatted(userReview.tripTime, {
              timeZone: "UTC",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="text-[0.75rem] text-gray-500">
            Written {getDateTimeFormatted(userReview.reviewAt)}
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="font-bold">{`#${userReview.tripType.name}`}</span>
          {userReview.user?.address?.country && (
            <LocationTypo
              extendClassName="text-[0.8rem] text-gray-500 gap-1"
              country={userReview.user?.address?.country?.name}
              province={userReview.user?.address?.province?.name}
              district={userReview.user?.address?.district?.name}
              ward={userReview.user?.address?.ward?.name}
              streetAddress={userReview.user?.address?.streetAddress}
              prefix="From"
            />
          )}
        </div>
      </footer>
    </div>
  )
}

export default UserReviewArticle
