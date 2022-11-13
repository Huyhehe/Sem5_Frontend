import { FunctionComponent, useEffect, useState } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import Search from "../../components/Search"
import { Review } from "../../interfaces/Review"
import { getAllReview } from "../../utils/http"
import SearchResult from "./pages/SearchResult"
import "./styles.css"

interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = () => {
  const [queryString] = useSearchParams()
  const { id } = useParams()
  const [searchResult, setSearchResult] = useState<Review[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllReview()
      setSearchResult(
        response.filter(
          (item: Review) =>
            item.title
              .toLowerCase()
              .includes(queryString.get("data")?.toLowerCase() as string) ||
            item.address
              .toLowerCase()
              .includes(queryString.get("data")?.toLowerCase() as string)
        )
      )
    }
    fetchData()
  }, [queryString])
  return (
    <div className="search-page w-[1260px] pb-4">
      <div className="search-container h-[10rem] relative z-10">
        <Search defaultValue={queryString.get("data") || ""} />
      </div>
      {!id ? <SearchResult searchResult={searchResult} /> : <Outlet />}
    </div>
  )
}

export default SearchPage
