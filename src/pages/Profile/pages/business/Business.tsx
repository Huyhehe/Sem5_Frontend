import Button from "antd/es/button"
import { useNavigate, useOutletContext } from "react-router-dom"

const Business = () => {
  const { userInfo } = useOutletContext<any>()
  const navigator = useNavigate()
  return (
    <div className="activity-feed shadow-custom px-4 rounded-md">
      {userInfo?.account.isSale ? (
        <div>userInfo</div>
      ) : (
        <div className="flex flex-col p-4 gap-2">
          <h1 className="text-center text-xl font-bold">
            Let&apos;s start your first business!
          </h1>
          <p className="text-center text-sm m-auto">
            Start publishing your very first hotel! Easier marketing with us
            <br />
            <Button
              type="primary"
              className="mt-4 bg-[#1890ff] hover:bg-[#69c0ff]"
              onClick={() => {
                navigator("/hotels/create-hotel/general-info")
              }}
            >
              Start now
            </Button>
          </p>
        </div>
      )}
    </div>
  )
}

export default Business
