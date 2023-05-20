import { getPagingLocation } from "@/service/api/location"
import { LocationsResponse } from "@/types/responses/location"
import { Form, Input } from "antd"
import { useLayoutEffect, useRef, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { FiMapPin } from "react-icons/fi"
import { createSearchParams, useNavigate } from "react-router-dom"
import { LocationTypo } from "../common/LocationTypo"
import "./styles.css"

interface SearchProps {
  defaultValue?: string
}

const Search = ({ defaultValue }: SearchProps) => {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<any>(null)
  const [isFocusing, setIsFocusing] = useState<boolean>(false)
  const [searchString, setSearchString] = useState(defaultValue || "")
  const [searchResult, setSearchResult] = useState<LocationsResponse>([])
  const navigator = useNavigate()

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.input.value = defaultValue || ""
  //   }
  // }, [defaultValue])

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

  const handleFocus = () => {
    setIsFocusing(true)
  }

  const handleOnSubmit = () => {
    if (searchString === "") return
    const params = {
      data: searchString,
      paging: "1",
    }
    setIsFocusing(false)
    navigator({
      pathname: "/search",
      search: `?${createSearchParams(params)}`,
    })
  }

  const handleResultItemClick = (locationID: string) => {
    setIsFocusing(false)
    navigator({
      pathname: `/search/${locationID}`,
    })
  }
  useLayoutEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const result = await getPagingLocation({ searchString })
        setSearchResult(result)
      } catch (error) {
        console.log(error)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [searchString])

  return (
    <div
      ref={formContainerRef}
      className="search-box absolute w-[70%] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg py-2 rounded-full z-10"
    >
      <Form onFinish={handleOnSubmit}>
        <Form.Item className="mb-0 px-2">
          <Input
            ref={inputRef}
            value={searchString}
            name="searchData"
            prefix={<BiSearch className="mr-2" />}
            className="text-[1.5rem] outline-none rounded-full"
            placeholder="Search something..."
            allowClear
            bordered={false}
            onChange={(e) => setSearchString(e.target.value)}
            // onKeyDown={handleOnKeyDown}
            onFocus={handleFocus}
          ></Input>
        </Form.Item>
      </Form>
      {isFocusing && (
        <div ref={dropDownRef} className="dropdown-container">
          <div className="dropdown-container-header flex items-center px-4 py-2">
            <FiMapPin className="mr-2" size={20} />
            <span className="text-[1.25rem]">
              {searchString
                ? `result for '${searchString}'`
                : "Search anything"}
            </span>
          </div>
          {searchResult.map((location, index) => {
            return (
              <div
                onClick={() => handleResultItemClick(location.id)}
                key={index}
                className="dropdown-container-item"
              >
                <FiMapPin className="mr-2" size={20} />
                <div className="flex flex-col gap-1">
                  <span className="text-[1.25rem]">{location.name}</span>
                  <LocationTypo
                    country={location.address?.country?.name}
                    province={location.address?.province?.name}
                    district={location.address?.district?.name}
                    ward={location.address?.ward?.name}
                    streetAddress={location.address?.streetAddress}
                  />
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
