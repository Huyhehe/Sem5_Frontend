import UserReview from "@/interfaces/UserReview"
import { deleteReviewAPI } from "@/utils/http"
import { getDateTimeFormatted } from "@/utils/reusable"
import { message } from "antd"
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import RatePoint from "./common/RatePoint"

export const ReviewCardInProfile = ({
  review,
  setReview,
}: {
  review: UserReview
  setReview: any
}) => {
  const navigator = useNavigate()
  const handleEditButtonClick = () => {
    navigator(`/review/edit/${review.id}`)
  }
  const handleDeleteButtonClick = async () => {
    try {
      const res = await deleteReviewAPI(review.id)
      setReview((prev: any) => {
        return prev.filter((item: any) => item.id !== review.id)
      })
      message.success("Delete review successfully")
    } catch (error: any) {
      message.error(error.message)
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col gap-4 shadow-custom p-4 rounded-md">
      <div className="main flex justify-between">
        <div>
          <h1
            className="font-bold text-2xl hover:underline hover:text-primary cursor-pointer"
            onClick={() => navigator(`/search/${review.location}`)}
          >
            {review.title}
          </h1>
          <p className="italic text-[1rem]">{review.content}</p>
        </div>
        <div className="main-tools flex gap-2">
          <AiFillEdit
            size={20}
            className="text-gray-400 hover:text-primary cursor-pointer"
            onClick={handleEditButtonClick}
          />
          <MdDelete
            size={20}
            className="text-gray-400 hover:text-primary cursor-pointer"
            onClick={handleDeleteButtonClick}
          />
        </div>
      </div>
      <div className="footer flex justify-between">
        <div className="flex flex-col">
          <span className="text-gray-500 text-[0.8rem]">
            Visited on{" "}
            {getDateTimeFormatted(review.trip_time, {
              timeZone: "UTC",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="text-gray-500 text-[0.8rem]">
            Written on {getDateTimeFormatted(review.review_date)}
          </span>
        </div>
        <RatePoint point={review.rating} />
      </div>
    </div>
  )
}
