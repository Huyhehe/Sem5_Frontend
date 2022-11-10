import { FunctionComponent } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import Search from "../../components/Search"
import Card from "./components/Card"
import "./styles.css"
import { Item } from "./components/Card"

interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = () => {
  const [queryString] = useSearchParams()
  const { id } = useParams()
  console.log(queryString ? "true" : "false")
  console.log(id)

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
  return (
    <div className="search-page w-[1260px]">
      <div className="search-container h-[10rem] relative z-10">
        <Search defaultValue={queryString.get("data") || ""} />
      </div>
      {!id ? (
        <div className="search-result-container flex flex-col rounded-lg overflow-hidden">
          {dummySearchResult.map((item, index) => (
            <div
              key={index}
              className="search-result-item hover:bg-gray-200 cursor-pointer border-b last:border-0"
            >
              <Card item={item} />
            </div>
          ))}
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  )
}

export default SearchPage
