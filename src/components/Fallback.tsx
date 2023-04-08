import { Spin } from "antd"

const Fallback = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spin size="large" tip="loading..." />
    </div>
  )
}

export default Fallback
