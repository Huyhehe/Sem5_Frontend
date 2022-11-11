import { FunctionComponent } from "react"
import { Item } from "../components/Card"
import Card from "../components/Card"
import { Empty } from "antd"

interface SearchResultProps {
  searchResult: Item[]
}

const SearchResult: FunctionComponent<SearchResultProps> = ({
  searchResult,
}) => {
  return (
    <>
      <div className="search-result-container flex flex-col rounded-lg overflow-hidden">
        {searchResult.map((item, index) => (
          <div
            key={index}
            className="search-result-item hover:bg-gray-200 cursor-pointer border-b last:border-0"
          >
            <Card item={item} />
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
