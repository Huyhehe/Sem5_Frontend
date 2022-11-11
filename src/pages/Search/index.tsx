import { FunctionComponent } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import Search from "../../components/Search"
import Card from "./components/Card"
import "./styles.css"
import { Item } from "./components/Card"
import SearchResult from "./pages/SearchResult"

interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = () => {
  const [queryString] = useSearchParams()
  const { id } = useParams()

  const dummySearchResult: Item[] = [
    {
      title: "Hoi An Hotel",
      address: "Hoi An, Quang Nam, Viet Nam",
      description:
        "Hoi An Hotel is a 5-star hotel located in Hoi An, Quang Nam, Viet Nam",
      price: 100,
      rate: 4.5,
      review: "Good",
    },
    {
      title: "Muong Thanh Hotel",
      address: "Da Nang, Viet Nam",
      description: "Muong Thanh Hotel is a 5-star hotel located in Da Nang",
      price: 200,
      rate: 4.5,
      review: "Bad",
    },
    {
      title: "Nha Trang Hotel",
      address: "Nha Trang, Viet Nam",
      description: "Nha Trang Hotel is a 5-star hotel located in Nha Trang",
      price: 300,
      rate: 4.5,
      review: "Average",
    },
  ]
  const searchResult = dummySearchResult.filter(
    (item) =>
      item.title.toLowerCase().includes(queryString.get("data") as string) ||
      item.address.toLowerCase().includes(queryString.get("data") as string)
  )
  return (
    <div className="search-page w-[1260px]">
      <div className="search-container h-[10rem] relative z-10">
        <Search defaultValue={queryString.get("data") || ""} />
      </div>
      {!id ? <SearchResult searchResult={searchResult} /> : <Outlet />}
    </div>
  )
}

export default SearchPage
