import Spin from "antd/es/spin"
import "./styles.css"
const Loading = () => {
  return (
    <div className="loading-component absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/30 z-[9999]">
      <Spin />
    </div>
  )
}

export default Loading
