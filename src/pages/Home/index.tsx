import { FunctionComponent, useContext, useEffect, useState } from "react"
import Search from "../../components/Search/Search"
import { searchBg } from "../../assets/images"
import CustomSlide from "@/components/CustomSlide"
import { getAllLocationReviews } from "@/utils/http"
import LocationReview from "@/interfaces/LocationReview"
import Card from "@/components/Card"
import { useNavigate } from "react-router-dom"
import { AppContext } from "@/App"

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
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
  const [cardItems, setCardItems] = useState<LocationReview[] | null>(null)
  const navigator = useNavigate()
  useEffect(() => {
    setCurrentRoute(window.location.pathname)
    const fetchData = async () => {
      try {
        const response = await getAllLocationReviews()
        console.log(response)
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
      <CustomSlide
        size={300}
        className="h-fit gap-4"
        slideBgColor="bg-transparent"
        slideToShow={4}
      >
        {cardItems?.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.name}
              description={item.description}
              price={item.price_level}
              rate={item.rating}
              onClickFunc={() => handleCardClick(item.id)}
            />
          )
        })}
      </CustomSlide>
    </div>
  )
}

export default Home
