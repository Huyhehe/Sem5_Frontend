import { Empty } from "antd"
import SearchCard from "../components/SearchCard"

import { LocationsResponse } from "@/types/responses/location"
import { useNavigate } from "react-router-dom"

interface SearchResultProps {
  searchResult: LocationsResponse
}

const SearchResult = ({ searchResult }: SearchResultProps) => {
  document.title = "TravelCare | Search"

  const navigator = useNavigate()
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
