import Space from "antd/es/space"
import Skeleton from "antd/es/skeleton"
import Divider from "antd/es/divider"

const SkeletonHotelCard = () => {
  return (
    <Space.Compact
      block
      className="rounded-md overflow-hidden border border-gray-300/50"
    >
      <Skeleton.Image className="w-[300px] h-[250px]" active />
      <div className="flex flex-grow flex-col gap-4 p-4">
        <Skeleton.Input active block />
        <div className="flex flex-grow gap-2">
          <div className="flex flex-col items-center justify-center gap-1">
            <Skeleton.Button active />
            <Skeleton.Input active />
          </div>
          <Divider type="vertical" className="h-full" />
          <div className="flex flex-col px-6 gap-2 flex-1">
            <Skeleton.Input active block />
            <div className="flex flex-col gap-1">
              <Skeleton.Input active />
              <Skeleton.Input active />
              <Skeleton.Input active />
            </div>
          </div>
        </div>
      </div>
    </Space.Compact>
  )
}

export default SkeletonHotelCard
