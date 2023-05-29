import Spin from "antd/es/spin"
import "./styles.css"
const Loading = () => {
  return (
    <div className="loading-component absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/30 z-[9999] pointer-events-none select-none">
      <Spin />
    </div>
  )
}

export default Loading
