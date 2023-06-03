import Empty from "antd/es/empty"
import SearchCard from "../components/SearchCard"

import { LocationsResponseData } from "@/types/responses/location"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/App"
import { getPagingLocation } from "@/service/api/location"

interface SearchResultProps {
  queryString: URLSearchParams
}

const SearchResult = ({ queryString }: SearchResultProps) => {
  document.title = "TravelCare | Search"

  const navigator = useNavigate()
  const [searchResult, setSearchResult] = useState<LocationsResponseData>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setLoading } = useContext<any>(AppContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await getPagingLocation({
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

  const handleOnCardClick = (id: string) => {
    navigator(`/search/${id}`)
  }

  return (
    <>
      <div className="search-result-container flex flex-col rounded-lg overflow-hidden">
        {searchResult.map((item) => (
          <div
            key={item.id}
            className="search-result-item hover:bg-gray-200 cursor-pointer border-b last:border-0"
          >
            <SearchCard
              item={item}
              onClickFunc={() => handleOnCardClick(item.id)}
            />
          </div>
        ))}
      </div>
      {searchResult.length === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No result"
          className="text-[1.5rem]"
        />
      )}
    </>
  )
}

export default SearchResult
