import { Form, Input } from "antd"
import { FunctionComponent, useRef, useState } from "react"
import { searchBg } from "../../../assets/images"
import { BiSearch } from "react-icons/bi"
import { FiMapPin } from "react-icons/fi"

interface SearchProps {}

const Search: FunctionComponent<SearchProps> = () => {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const [isFocusing, setIsFocusing] = useState(false)
  let inputTimeout: any
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setIsFocusing(false)
    }
  })

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
  ]

  const handleOnKeyUp = (e: any) => {
    if (inputTimeout) clearTimeout(inputTimeout)
    inputTimeout = setTimeout(() => {
      console.log(e.target.value ? e.target.value : "empty")
    }, 1000)
  }
  const handleFocus = (e: any) => {
    setIsFocusing(true)
  }
  const handleBlur = (e: any) => {
    setIsFocusing(false)
  }
  return (
    <div className="search-container relative z-10">
      <div
        tabIndex={0}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={formContainerRef}
        className={`search-box absolute w-[70%] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg py-2 rounded-full`}
      >
        <Form>
          <Form.Item className="mb-0 px-2">
            <Input
              name="searchData"
              prefix={<BiSearch className="mr-2" />}
              className="text-[1.5rem] outline-none rounded-full"
              placeholder="Search something..."
              allowClear
              bordered={false}
              onKeyUp={handleOnKeyUp}
            ></Input>
          </Form.Item>
        </Form>
        {isFocusing && (
          <div
            ref={dropDownRef}
            className="display-container absolute max-h-[20rem] top-full translate-y-[0.5rem] left-0 w-full flex flex-col bg-white rounded-xl py-2 overflow-auto"
          >
            <div className="display-container-header flex items-center px-4 py-2">
              <FiMapPin className="mr-2" size={20} />
              <span className="text-[1.25rem]">Search by location</span>
            </div>
            {dummySearchResult.map((item, index) => {
              return (
                <div
                  key={index}
                  className="display-container-item relative flex items-center px-4 py-2 cursor-pointer after:absolute after:w-[calc(100%_-_2rem)] last:after:w-0 after:h-[1px] after:bg-gray-200 after:bottom-0 after:left-1/2 after:-translate-x-1/2 hover:after:w-0 hover:bg-gray-200"
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
      <img src={searchBg} alt="search-background" />
    </div>
  )
}

export default Search
