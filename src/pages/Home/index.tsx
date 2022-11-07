import { FunctionComponent } from "react"
import Slider from "../../components/Slider/Slider"
import Search from "./components/Search"
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="homePage-container flex flex-col gap-[5rem]">
      <Search />
      <Slider />
    </div>
  )
}

export default Home
