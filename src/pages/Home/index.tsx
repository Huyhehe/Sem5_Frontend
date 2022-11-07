import { FunctionComponent } from "react"
import Slider from "../../components/Slider/Slider"
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="homePage-container">
      <Slider />
    </div>
  )
}

export default Home
