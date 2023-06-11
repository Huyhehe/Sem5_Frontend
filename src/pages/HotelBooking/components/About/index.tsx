import { RoomFeature, RoomType } from "@/interfaces/hotel"
import { IPropertyAmenity } from "@/types/responses/hotel/hotelBooking.res.type"
import Rate from "antd/es/rate"
import { FaStar } from "react-icons/fa"

interface IAboutTripDescriptionProps {
  title: string
  iconBlocks: IconBlock[]
}

interface IconBlock {
  icon: string
  name: string
  id: string
}

interface IAboutProps {
  aboutText: string
  propertyAmenities: IPropertyAmenity[]
  listRoomType: RoomType[]
  listRoomFeature: RoomFeature[]
  rating: number
  reviewCount: number
}
const About = (props: IAboutProps) => {
  const {
    aboutText,
    propertyAmenities,
    listRoomType,
    listRoomFeature,
    rating,
    reviewCount,
  } = props

  return (
    <div className="py-6 px-8 border border-[#ccc]/30 rounded-md shadow-sm">
      <h2 className="text-2xl font-bold pb-3 border-b border-gray-400/40">
        About
      </h2>
      <div className="pt-8">
        <div className="grid grid-cols-2 gap-x-8">
          <div className="pb-4 border-b border-gray-500/30">
            <div className="flex items-stretch gap-x-3">
              <h3 className="h-full font-bold text-5xl">5.0</h3>
              <div className="flex flex-col gap-y-0.5">
                <span className="font-medium text-lg">Excellent</span>
                <div className="flex items-center gap-x-1">
                  <Rate
                    className="text-green-600 flex"
                    allowHalf
                    value={rating}
                    character={<FaStar />}
                    disabled
                  />
                  <span className="text-sm text-gray-600 font-medium">
                    {reviewCount} reviews
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-4 tracking-wider text-lg">{aboutText}</p>
          </div>
          <div className="flex flex-col gap-y-8 pb-4 border-b border-gray-500/30">
            <AboutTripDescription
              iconBlocks={propertyAmenities as IconBlock[]}
              title="Property amenities"
            />
            <AboutTripDescription
              iconBlocks={listRoomFeature as IconBlock[]}
              title="Room features"
            />
            <AboutTripDescription
              iconBlocks={listRoomType as IconBlock[]}
              title="Room types"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const AboutTripDescription = ({
  title,
  iconBlocks,
}: IAboutTripDescriptionProps) => {
  return (
    <div className="">
      <h5 className="text-sm font-bold">{title}</h5>
      <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4">
        {iconBlocks?.map((icon: IconBlock, index: number) => (
          <div className="flex items-center gap-x-2" key={index}>
            <img src={icon.icon} alt="icon" className="w-5 h-5" />
            <span className="text-sm text-gray-600">{icon.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About
