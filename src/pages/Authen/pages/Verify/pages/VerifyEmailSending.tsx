import { AppContext } from "@/App"
import { verifyEmailAPI } from "@/utils/http"
import { FunctionComponent, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"

interface VerifyEmailSendingProps {}

const VerifyEmailSending: FunctionComponent<VerifyEmailSendingProps> = () => {
  const { openNotification } = useContext(AppContext)
  const { param1 } = useParams()
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await verifyEmailAPI(param1 as any as string)
        openNotification({
          type: "success",
          message: "Success",
          description: res.message,
        })
      } catch (error: any) {
        openNotification("error", {
          message: "Error",
          description: error.message,
        })
      }
    }
    verifyEmail()
  }, [])
  return (
    <div>
      <h1 className="text-2xl font-bold">Hold on, still verifying...</h1>
    </div>
  )
}

export default VerifyEmailSending
