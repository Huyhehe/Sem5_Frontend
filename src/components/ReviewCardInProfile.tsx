import { UserReview } from "@/interfaces/review"
import { getDateTimeFormatted } from "@/utils/reusable"
import message from "antd/es/message"
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import RatePoint from "./common/RatePoint"
import { deleteLocationReview } from "@/service/api/review"
import Modal from "antd/es/modal/Modal"
import { useState } from "react"

interface ReviewCardInProfileProps {
  review: UserReview
  updateReviews: (reviewId: string) => void
}

export const ReviewCardInProfile = ({
  review,
  updateReviews,
}: ReviewCardInProfileProps) => {
  const navigator = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const handleEditButtonClick = () => {
    navigator(`/review/edit/${review.id}`)
  }

  const handleDeleteReview = async () => {
    try {
      await deleteLocationReview(review.id)
      updateReviews(review.id)
      setIsOpen(false)
      message.success("Delete review successfully")
    } catch (error: any) {
      setIsOpen(false)
      message.error(error.message)
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col gap-4 shadow-custom p-4 rounded-md">
      <div className="main flex justify-between">
        <div>
          <h1
            className="font-bold text-2xl underline hover:text-primary cursor-pointer"
            onClick={() => navigator(`/search/${review.location?.id}`)}
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
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <div className="footer flex justify-between">
        <div className="flex flex-col">
          <span className="text-gray-500 text-[0.8rem]">
            Visited on{" "}
            {getDateTimeFormatted(review.tripTime, {
              timeZone: "UTC",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="text-gray-500 text-[0.8rem]">
            Written on {getDateTimeFormatted(review.reviewAt)}
          </span>
        </div>
        <RatePoint point={review.rating} />
      </div>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={handleDeleteReview}
        okText="Delete"
        centered
      >
        <div>Are you sure you want to delete this review?</div>
      </Modal>
    </div>
  )
}
