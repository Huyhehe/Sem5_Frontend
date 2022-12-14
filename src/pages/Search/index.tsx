import { AppContext } from "@/App"
import { getAddressString, removeAccent } from "@/utils/reusable"
import { FunctionComponent, useContext, useEffect, useState } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import Search from "../../components/Search/Search"
import LocationReview from "../../interfaces/LocationReview"
import { getAllLocationReviews } from "../../utils/http"
import SearchResult from "./pages/LocationSearchResult"
import "./styles.css"

interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = () => {
  const [queryString] = useSearchParams()
  const { id } = useParams()
  const [searchResult, setSearchResult] = useState<LocationReview[]>([])
  const { setLoading } = useContext<any>(AppContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLocationReviews()

        if (!id) setLoading(true)
        setTimeout(() => {
          setLoading(false)
          queryString.get("data")?.toLowerCase()
            ? setSearchResult(
                response.filter(
                  (item: LocationReview) =>
                    removeAccent(item.name.toLowerCase()).includes(
                      queryString.get("data")?.toLowerCase() as string
                    ) ||
                    removeAccent(
                      getAddressString(item.address).toLowerCase()
                    ).includes(queryString.get("data")?.toLowerCase() as string)
                )
              )
            : setSearchResult(response)
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
