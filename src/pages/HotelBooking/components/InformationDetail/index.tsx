import { LocationTypo } from "@/components/common/LocationTypo"
import { ILocation } from "@/types/responses/hotel/hotelBooking.res.type"
import { AiOutlineHeart, AiOutlineMail } from "react-icons/ai"
import { BiUpload } from "react-icons/bi"
import { BsPencil, BsTelephone } from "react-icons/bs"
import GalleryImage from "../GalleryImage"
import { useNavigate } from "react-router-dom"

interface IInformationDetailProps {
  location: ILocation | null
  email: string
  phoneNumber: string
  imageUrlLocations: string[]
  isActiveWishlist: boolean
  onClickWishlist: () => any
}
function InformationDetail(props: IInformationDetailProps) {
  const navigator = useNavigate()
  const { location, email, phoneNumber, imageUrlLocations, isActiveWishlist, onClickWishlist } = props

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{location?.name}</h1>
        <div className="flex items-center gap-x-3">
          <button className="border border-black rounded-[50%] p-1 group hover:bg-black">
            <BiUpload size={20} className="group-hover:text-white" />
          </button>
          <button
            className='rounded-[50%] p-1'>
            <div
              className={`bookmark p-2 border-[2px] cursor-pointer ${isActiveWishlist
                ? 'bg-love border-white text-white hover:border-love hover:bg-white hover:text-love'
                : ' text-love border-love hover:text-white hover:border-white hover:bg-love'}
                    rounded-full`}
              onClick={onClickWishlist}
            >
              <AiOutlineHeart size={30} />
            </div>

          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div>
          <div className="mt-2 flex items-center gap-x-2">
            <LocationTypo
              country={location?.address?.country?.name}
              province={location?.address?.province?.name}
              district={location?.address?.district?.name}
              ward={location?.address?.ward?.name}
              streetAddress={location?.address?.streetAddress}
            />
          </div>

          <div className="flex items-center gap-x-6 mt-4">
            <div className="flex items-center gap-x-2">
              <BsTelephone size={18} />
              <span className="hover:underline cursor-pointer">
                {phoneNumber}
              </span>
            </div>
            <div className="flex items-center gap-x-2">
              <AiOutlineMail size={18} />
              <span className="hover:underline cursor-pointer">{email}</span>
            </div>
            <div
              className="flex items-center gap-x-2"
              onClick={() => {
                navigator(`/review/${location?.id}`)
              }}
            >
              <BsPencil size={18} />
              <span className="hover:underline cursor-pointer">
                Write a review
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <GalleryImage imageUrlLocations={imageUrlLocations} />
      </div>
    </div>
  )
}

export default InformationDetail
