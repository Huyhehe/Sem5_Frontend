import { FunctionComponent } from "react"
import SearchCard from "../components/SearchCard"
import { Empty } from "antd"
import { Review } from "../../../interfaces/Review"
import { useNavigate } from "react-router-dom"

interface SearchResultProps {
  searchResult: Review[]
}

const SearchResult: FunctionComponent<SearchResultProps> = ({
  searchResult,
}) => {
  const navigator = useNavigate()
  const handleOnCardClick = (id: number) => {
    navigator(`/search/${id}`)
  }

  return (
    <>
      <div className="search-result-container flex flex-col rounded-lg overflow-hidden">
        {searchResult.map((item, index) => (
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
