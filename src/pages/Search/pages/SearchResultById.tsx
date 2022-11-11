import { FunctionComponent } from "react"
import { useParams } from "react-router-dom"

interface SearchResultByIdProps {}

const SearchResultById: FunctionComponent<SearchResultByIdProps> = () => {
  const { id } = useParams()
  console.log(id)
  return <div>Search result page {id}</div>
}

export default SearchResultById
