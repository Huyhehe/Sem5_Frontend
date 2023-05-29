import { ReviewCardInProfile } from "@/components/ReviewCardInProfile"
import { UserReview } from "@/interfaces/review"
import { getAllReviewByCurrentUser } from "@/service/api/review"

import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

export default function MyReviews() {
  const { userInfo } = useOutletContext<any>()

  const [reviews, setReviews] = useState<UserReview[]>([])

  const updateReviews = (reviewId: string) => {
    setReviews((prev) => {
      return prev.filter((item) => item.id !== reviewId)
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviews = await getAllReviewByCurrentUser()
        setReviews(reviews)
      } catch (error: any) {
        console.log(error)
      }
    }
    fetchData()
  }, [userInfo])

  return (
    <div className="flex flex-col gap-2">
      {reviews.map((review, index) => {
        return (
          <ReviewCardInProfile
            key={index}
            review={review}
            updateReviews={updateReviews}
          />
        )
      })}
    </div>
  )
}
