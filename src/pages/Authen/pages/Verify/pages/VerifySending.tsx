import { AppContext } from "@/App"
import { FunctionComponent, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface VerifySendingProps {}
export const VerifySending: FunctionComponent<VerifySendingProps> = () => {
  const { param1, param2 } = useParams()
  const { setLoading } = useContext(AppContext)
  const [isVerifySucceed, setIsVerifySucceed] = useState(false)
  const [counter, setCounter] = useState(3)
  const navigator = useNavigate()
  console.log(param1, param2)
  useEffect(() => {
    if (!isVerifySucceed) {
      setLoading(true)
      const verify = async () => {
        try {
          // const response = await verifyEmail(param1, param2)
          setLoading(false)
          setIsVerifySucceed(true)
        } catch (error) {
          setLoading(false)
        }
      }
      verify()
    } else if (isVerifySucceed && counter > 0) {
      const timer = setInterval(() => {
        setCounter((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
    if (counter === 0) {
      navigator("/login/signIn")
    }
  })

  return (
    <div className="text-2xl font-bold flex flex-col">
      {isVerifySucceed ? (
        <>
          <span>Your account is successfully verified </span>
          <span>
            You would be redirected to login page in {counter} seconds
          </span>
        </>
      ) : (
        "Verify code is sending to server..."
      )}
    </div>
  )
}
