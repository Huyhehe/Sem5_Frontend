import { useOutletContext } from "react-router-dom"

const ActivityFeed = () => {
  const { userInfo } = useOutletContext<any>()
  return (
    <div className="activity-feed shadow-custom px-4 rounded-md">
      {userInfo?.about ? (
        <div>userInfo</div>
      ) : (
        <div className="flex flex-col p-4 gap-2">
          <h1 className="text-center text-xl font-bold">
            Fill Out Your Profile
          </h1>
          <p className="text-center text-sm m-auto">
            Add photos and info to your profile so people can find you easily
            and get to know you better! <br />
            Hope you have a great time here!
          </p>
        </div>
      )}
    </div>
  )
}

export default ActivityFeed
