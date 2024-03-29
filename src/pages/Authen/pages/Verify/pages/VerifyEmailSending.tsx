import { AppContext } from "@/App"
import { verifyEmailAPI } from "@/utils/http"
import { Spin } from "antd"
import { useContext, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

const VerifyEmailSending = () => {
  const { openNotification } = useContext(AppContext)
  const [counter, setCounter] = useState<number | null>(null)
  const [queryString] = useSearchParams()
  const token = useMemo(() => {
    return queryString.get("token")?.toLowerCase() || ""
  }, [queryString])

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await verifyEmailAPI(token)
        openNotification({
          type: "success",
          message: "Success",
          description: res.message,
        })
        setCounter(5)
      } catch (error: any) {
        openNotification("error", {
          message: "Error",
          description: `Our team has been notified. Please try again later. Error: ${error.message}`,
        })
      }
    }
    return () => {
      verifyEmail()
    }
  }, [])

  useEffect(() => {
    if (counter === null) return
    if (counter !== null && counter === 0) return window.location.replace("/")

    const timer: NodeJS.Timer = setInterval(() => {
      setCounter((prev) => (prev !== null ? prev - 1 : null))
    }, 1000)

    return () => clearInterval(timer)
  }, [counter])

  return (
    <div>
      {!counter ? (
        <h1 className="text-2xl font-bold">
          Hold on, still verifying <Spin />
        </h1>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">
            Verify successfully, you would be navigated to login page in{" "}
            {counter}
          </h1>
        </div>
      )}
    </div>
  )
}

export default VerifyEmailSending
