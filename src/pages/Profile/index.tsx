import useUser from "@/hooks/useUser"
import UserInfo from "@/interfaces/UserInfo"
import { getUserAPI } from "@/utils/http"
import { FunctionComponent, useEffect, useState } from "react"

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const user = useUser()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserAPI(user.id)
        setUserInfo(response)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])
  return (
    <div className="profile flex flex-col w-full">
      <div className="general-info-container">{userInfo?.first_name}</div>
    </div>
  )
}

export default Profile
