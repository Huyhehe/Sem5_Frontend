import { AppContext } from "@/App"
import Slide from "@/components/common/Slide"
import LocationReview from "@/interfaces/LocationReview"
import { getAllLocationReviews } from "@/utils/http"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchBg } from "../../assets/images"
import Search from "../../components/Search/Search"

const Home = () => {
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
  const { setCurrentRoute } = useContext(AppContext)
  const [cardItems, setCardItems] = useState<LocationReview[]>(dataOnError)
  const navigator = useNavigate()
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
  const handleCardClick = (id: string) => {
    navigator(`/search/${id}`)
  }
  return (
    <div className="homePage-container flex flex-col gap-[5rem] w-full">
      <div className="search-container relative z-10">
        <Search />
        <img src={searchBg} alt="search-background" />
      </div>
      <Slide cardItems={cardItems} handleCardClick={handleCardClick} />
    </div>
  )
}

export default Home
