import { FunctionComponent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Review } from "../../../interfaces/Review"
import { getReviewById } from "../../../utils/http"

interface SearchResultByIdProps {}

const SearchResultById: FunctionComponent<SearchResultByIdProps> = () => {
  const { id } = useParams()
  const [review, setReview] = useState<Review | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getReviewById(Number(id))
      setReview(response)
    }
    fetchData()
  }, [])

  return <div>Search result page {review?.title}</div>
}

export default SearchResultById
