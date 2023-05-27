import Skeleton from "antd/es/skeleton"

const SkeletonCard = () => {
  return (
    <div className="card-container relative flex flex-col box-border md:w-[250px] xl:w-[300px] h-[250px] bg-white rounded-[0.5rem] overflow-hidden border hover:shadow-md select-none">
      <div className="card-image w-full h-[55%]">
        <Skeleton.Image className="w-full h-full object-cover" active />
      </div>
      <div className="card-content p-4 flex-grow flex flex-col">
        <Skeleton.Input active />
        <Skeleton.Input active block className="mt-2" />
      </div>
      <div className="absolute top-0 left-0 w-full flex justify-between p-2">
        <Skeleton.Button
          active
          className="w-[36px] aspect-square text-white flex justify-center items-center rounded-lg font-bold"
        />
      </div>
    </div>
  )
}

export default SkeletonCard
