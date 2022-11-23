import { AppContext } from "@/App"
import { FunctionComponent, useContext, useEffect, useState } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import Search from "../../components/Search/Search"
import { Review } from "../../interfaces/Review"
import { getAllReview } from "../../utils/http"
import SearchResult from "./pages/SearchResult"
import "./styles.css"

interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = () => {
  const [queryString] = useSearchParams()
  const { id } = useParams()
  const [searchResult, setSearchResult] = useState<Review[]>([])
  const { setLoading } = useContext<any>(AppContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllReview()
        if (!id) setLoading(true)
        setTimeout(() => {
          setLoading(false)
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
        }, 2000)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [queryString])
  return (
    <div className="search-page w-full xl:w-[80%] pb-4">
      <div className="search-container h-[10rem] relative z-10">
        <Search defaultValue={queryString.get("data") || ""} />
      </div>
      {!id ? <SearchResult searchResult={searchResult} /> : <Outlet />}
    </div>
  )
}

export default SearchPage
