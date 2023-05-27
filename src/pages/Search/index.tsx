import { AppContext } from "@/App"
import { getPagingLocation } from "@/service/api/location"
import { LocationsResponseData } from "@/types/responses/location"
import { useContext, useEffect, useState } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import Search from "../../components/Search/Search"
import SearchResult from "./pages/LocationSearchResult"
import "./styles.css"

const SearchPage = () => {
  const [queryString] = useSearchParams()
  const { id } = useParams()
  const [searchResult, setSearchResult] = useState<LocationsResponseData>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setLoading } = useContext<any>(AppContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data, pagination } = await getPagingLocation({
          searchString: queryString.get("data") || "",
        })

        setLoading(false)
        setSearchResult(data)
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
