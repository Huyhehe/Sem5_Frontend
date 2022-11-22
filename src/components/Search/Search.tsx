import { Form, Input } from "antd"
import { FunctionComponent, useEffect, useRef, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { FiMapPin } from "react-icons/fi"
import { createSearchParams, useNavigate } from "react-router-dom"
import "./styles.css"

interface SearchProps {
  defaultValue?: string
}

const Search: FunctionComponent<SearchProps> = ({ defaultValue }) => {
  const dummySearchResult = [
    {
      title: "Hoi An Hotel",
      address: "Hoi An, Quang Nam, Viet Nam",
    },
    {
      title: "Muong Thanh Hotel",
      address: "Da Nang, Viet Nam",
    },
    {
      title: "Nha Trang Hotel",
      address: "Nha Trang, Viet Nam",
    },
    {
      title: "Nha Trang Hotel",
      address: "Nha Trang, Viet Nam",
    },
    {
      title: "Nha Trang Hotel",
      address: "Nha Trang, Viet Nam",
    },
    {
      title: "Little Hoi An",
      address: "Nha Trang, Viet Nam",
    },
  ]
  const formContainerRef = useRef<HTMLDivElement>(null)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<any>(null)
  const [isFocusing, setIsFocusing] = useState<Boolean>(false)
  const [inputValue, setInputValue] = useState<String>("")
  const [searchResult, setSearchResult] = useState(dummySearchResult)
  const navigator = useNavigate()
  let inputTimeout: any

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.input.value = defaultValue || ""
    }
  }, [defaultValue])

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setIsFocusing(false)
    }
  })
  document.addEventListener("click", (e) => {
    if (
      formContainerRef.current &&
      !formContainerRef.current.contains(e.target as Node)
    ) {
      setIsFocusing(false)
    }
  })

  const filterSearchResult = (searchData: string) => {
    return dummySearchResult.filter((item) => {
      const dataToSearch = item.address + item.title
      return dataToSearch.toLowerCase().includes(searchData.toLowerCase())
    })
  }

  const handleOnKeyUp = (e: any) => {
    if (inputTimeout) clearTimeout(inputTimeout)

    if (e.target.value === "") {
      setInputValue(e.target.value)
      setSearchResult(filterSearchResult(e.target.value))
      return
    }
    inputTimeout = setTimeout(() => {
      setInputValue(e.target.value)
      setSearchResult(filterSearchResult(e.target.value))
    }, 1000)
  }

  const handleOnKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setInputValue(e.target.value)
    }
  }
  const handleFocus = (e: any) => {
    setIsFocusing(true)
  }

  const handleOnSubmit = () => {
    if (inputValue === "") return
    const params = {
      data: inputValue as string,
    }
    setIsFocusing(false)
    navigator({
      pathname: "/search",
      search: `?${createSearchParams(params)}`,
    })
  }

  const handleResultItemClick = (item: any) => {
    const params = {
      data: item.title,
    }
    setIsFocusing(false)
    navigator({
      pathname: "/search",
      search: `?${createSearchParams(params)}`,
    })
  }

  return (
    <div
      ref={formContainerRef}
      className="search-box absolute w-[70%] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg py-2 rounded-full z-10"
    >
      <Form onFinish={handleOnSubmit}>
        <Form.Item className="mb-0 px-2">
          <Input
            ref={inputRef}
            name="searchData"
            prefix={<BiSearch className="mr-2" />}
            className="text-[1.5rem] outline-none rounded-full"
            placeholder="Search something..."
            allowClear
            bordered={false}
            onChange={handleOnKeyUp}
            onKeyDown={handleOnKeyDown}
            onFocus={handleFocus}
          ></Input>
        </Form.Item>
      </Form>
      {isFocusing && (
        <div ref={dropDownRef} className="dropdown-container">
          <div className="dropdown-container-header flex items-center px-4 py-2">
            <FiMapPin className="mr-2" size={20} />
            <span className="text-[1.25rem]">
              {inputValue ? `result for '${inputValue}'` : "Search anything"}
            </span>
          </div>
          {searchResult.map((item, index) => {
            return (
              <div
                onClick={() => handleResultItemClick(item)}
                key={index}
                className="dropdown-container-item"
              >
                <FiMapPin className="mr-2" size={20} />
                <div className="flex flex-col gap-1">
                  <span className="text-[1.25rem]">{item.title}</span>
                  <span className="text-[1rem] text-gray-500">
                    {item.address}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Search
