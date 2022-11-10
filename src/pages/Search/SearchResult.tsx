import { FunctionComponent } from "react"
import { useParams } from "react-router-dom"

interface SearchResultProps {}

const SearchResult: FunctionComponent<SearchResultProps> = () => {
  const { id } = useParams()
  console.log(id)
  return <div>Search result page</div>
}

export default SearchResult
