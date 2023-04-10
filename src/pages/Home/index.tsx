import { AppContext } from "@/App"
import Card from "@/components/Card"
import Slide from "@/components/common/Slide"
import LocationReview from "@/interfaces/LocationReview"
import { getAllLocationReviews } from "@/utils/http"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchBg, example } from "../../assets/images"
import Search from "../../components/Search/Search"
import Categories from "./components/Categories"
import ExploreMore from "./components/ExploreMore"
import PlaceSection from "./components/PlaceSection"
import RecentSearch from "./components/RecentSearch"

const dataOnError: LocationReview[] = [
  {
    id: "0",
    name: "???",
    address: {
      country: "??",
      province: "??",
      district: "??",
      street_address: "???",
    },
    description: "????????",
    price_level: 0,
    rating: "0",
  },
  {
    id: "0",
    name: "???",
    address: {
      country: "??",
      province: "??",
      district: "??",
      street_address: "???",
    },
    description: "????????",
    price_level: 0,
    rating: "0",
  },
  {
    id: "0",
    name: "???",
    address: {
      country: "??",
      province: "??",
      district: "??",
      street_address: "???",
    },
    description: "????????",
    price_level: 0,
    rating: "0",
  },
  {
    id: "0",
    name: "???",
    address: {
      country: "??",
      province: "??",
      district: "??",
      street_address: "???",
    },
    description: "????????",
    price_level: 0,
    rating: "0",
  },
]

const DUMMY_PLACE = [
  {
    title: "Riviera Maya",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/11/ad/caption.jpg?w=400&h=-1&s=1",
  },
  {
    title: "Riviera Maya",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/11/ad/caption.jpg?w=400&h=-1&s=1",
  },
  {
    title: "Riviera Maya",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/11/ad/caption.jpg?w=400&h=-1&s=1",
  },
  {
    title: "Riviera Maya",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/11/ad/caption.jpg?w=400&h=-1&s=1",
  },
  {
    title: "Riviera Maya",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/11/ad/caption.jpg?w=400&h=-1&s=1",
  },
  {
    title: "Riviera Maya",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/11/ad/caption.jpg?w=400&h=-1&s=1",
  },
]

const DUMMY_LOCATION = [
  {
    title: "Yellowstone National Park , WY",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cf/f9/eb/caption.jpg?w=400&h=400&s=1&cx=941&cy=299&chk=v1_18cfa51ea9b832b15689",
  },
  {
    title: "Yellowstone National Park , WY",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cf/f9/eb/caption.jpg?w=400&h=400&s=1&cx=941&cy=299&chk=v1_18cfa51ea9b832b15689",
  },
  {
    title: "Yellowstone National Park , WY",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cf/f9/eb/caption.jpg?w=400&h=400&s=1&cx=941&cy=299&chk=v1_18cfa51ea9b832b15689",
  },
  {
    title: "Yellowstone National Park , WY",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cf/f9/eb/caption.jpg?w=400&h=400&s=1&cx=941&cy=299&chk=v1_18cfa51ea9b832b15689",
  },
  {
    title: "Yellowstone National Park , WY",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cf/f9/eb/caption.jpg?w=400&h=400&s=1&cx=941&cy=299&chk=v1_18cfa51ea9b832b15689",
  },
  {
    title: "Yellowstone National Park , WY",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cf/f9/eb/caption.jpg?w=400&h=400&s=1&cx=941&cy=299&chk=v1_18cfa51ea9b832b15689",
  },
]

const Home = () => {
  const navigator = useNavigate()

  const { setCurrentRoute } = useContext(AppContext)

  const [cardItems, setCardItems] = useState<LocationReview[]>(dataOnError)

  const handleCardClick = (id: string) => {
    navigator(`/search/${id}`)
  }

  useEffect(() => {
    setCurrentRoute(window.location.pathname)
    const fetchData = async () => {
      try {
        const response = await getAllLocationReviews()
        setCardItems(response)
      } catch (error) {
        console.log(error)
        setCardItems(dataOnError)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="homePage-container flex flex-col gap-[2rem] w-full pb-10">
      <div>
        <Categories />
      </div>
      <div className="search-container relative z-10">
        <Search />
        <img src={searchBg} alt="search-background" />
      </div>
      <div >
        <PlaceSection data={DUMMY_PLACE} title="Where to go, right now" desc="Spots at the top of travelers’ must-go lists" />
      </div>
      <div>
        <RecentSearch />
      </div>
      <Slide>
        {cardItems?.map((item, index) =>
          <Card
            key={index}
            title={item.name}
            description={item.description}
            price={item.price_level}
            rate={item.rating}
            onClickFunc={() => handleCardClick(item.id)}
          />
        )}
      </Slide>

      {/* section next trip */}
      <div className="mt-6 flex items-stretch h-[10rem]">
        <div className="w-[60%] bg-[#faf1ed] px-4 pt-7 pb-4 flex flex-col ">
          <h3 className='font-bold tracking-wide text-black text-2xl'>Your next trip starts here</h3>
          <span className="block text-sm font-normal tracking-wide text-gray-500">Top-rated hotels that have earned the Best of the Best crown</span>
          <button className="mt-auto rounded-[2rem] px-2 py-3 w-[7rem] bg-black font-bold text-sm text-white">See the list</button>
        </div>
        <div className="flex-1 ">
          <img className="w-full h-full object-cover" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/f7/1d/a0/caption.jpg?w=1000&h=-1&s=1" alt="concac" />
        </div>
      </div>

      <div><ExploreMore /></div>

      <div >
        <PlaceSection title="Top destinations for your next vacation" data={DUMMY_LOCATION} />
      </div>

    </div>
  )
}

export default Home
