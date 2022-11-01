import { FunctionComponent } from "react"
import Card from "../../components/Card"
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div>
      <div>Home</div>
      <Card
        title="Good recipe makes good day"
        description="aksjdlasjdklajsdkljasasdasdasdasldkj"
        price={100}
        rate={8.5}
        review="Good"
      />
    </div>
  )
}

export default Home
