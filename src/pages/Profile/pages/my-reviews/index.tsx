import { ReviewCardInProfile } from "@/components/ReviewCardInProfile"
import UserReview from "@/interfaces/UserReview"
import { getAllReviewByUserIdAPI } from "@/utils/http"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

export const MyReviews = () => {
  const { userInfo } = useOutletContext<any>()

  const [reviews, setReviews] = useState<UserReview[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviews = await getAllReviewByUserIdAPI(userInfo.id)
        setReviews(reviews)
      } catch (error: any) {
        console.log(error)
      }
    }
    fetchData()
  }, [userInfo])
  console.log(reviews)

  return (
    <div className="flex flex-col gap-2">
      {reviews.map((review) => {
        return <ReviewCardInProfile review={review} setReview={setReviews} />
      })}
    </div>
  )
}
