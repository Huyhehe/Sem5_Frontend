import { FunctionComponent } from "react"
import Slider from "../../components/Slider/Slider"
import Search from "../../components/Search"
import { searchBg } from "../../assets/images"

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="homePage-container flex flex-col gap-[5rem]">
      <div className="search-container relative z-10">
        <Search />
        <img src={searchBg} alt="search-background" />
      </div>
      <Slider />
    </div>
  )
}

export default Home
