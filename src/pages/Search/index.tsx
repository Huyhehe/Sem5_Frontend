import { Outlet, useParams, useSearchParams } from "react-router-dom"
import Search from "../../components/Search/Search"
import SearchResult from "./pages/LocationSearchResult"
import "./styles.css"

const SearchPage = () => {
  const [queryString] = useSearchParams()
  const { id } = useParams()
  return (
    <div className="search-page w-full xl:w-[80%] pb-4">
      <div className="search-container h-[10rem] relative z-10">
        <Search defaultValue={queryString.get("data") || ""} />
      </div>
      {!id ? <SearchResult queryString={queryString} /> : <Outlet />}
    </div>
  )
}

export default SearchPage
