import { LocationTypo } from '@/components/common/LocationTypo'
import { ILocation } from '@/types/responses/hotel/hotelBooking.res.type'
import { Rate } from 'antd'
import { AiOutlineHeart, AiOutlineMail } from "react-icons/ai"
import { BiUpload, } from "react-icons/bi"
import { BsPencil, BsTelephone } from "react-icons/bs"
import { FaStar } from 'react-icons/fa'
import GalleryImage from '../GalleryImage'

interface IInformationDetailProps {
    location: ILocation | null
    email: string
    phoneNumber: string
    imageUrlLocations: string[]
}
function InformationDetail(props: IInformationDetailProps) {

    const { location, email, phoneNumber, imageUrlLocations } = props

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold'>{location?.name}</h1>
                <div className='flex items-center gap-x-3'>
                    <button
                        className='border border-black rounded-[50%] p-1 group hover:bg-black'>
                        <BiUpload size={20} className='group-hover:text-white' />
                    </button>
                    <button
                        className='border border-black rounded-[50%] p-1 group hover:bg-black'>
                        <AiOutlineHeart size={20} className='group-hover:text-white' />
                    </button>
                </div>
            </div>

            <div className='flex items-center justify-between mt-3'>
                <div>
                    <div className='mt-2 flex items-center gap-x-2'>
                        <LocationTypo
                            country={location?.address?.country?.name}
                            province={location?.address?.province?.name}
                            district={location?.address?.district?.name}
                            ward={location?.address?.ward?.name}
                            streetAddress={location?.address?.streetAddress}
                        />
                    </div>

                    <div className='flex items-center gap-x-6 mt-4'>
                        <div className='flex items-center gap-x-2'>
                            <BsTelephone size={18} />
                            <span className='hover:underline cursor-pointer'>{phoneNumber}</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <AiOutlineMail size={18} />
                            <span className='hover:underline cursor-pointer'>{email}</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <BsPencil size={18} />
                            <span className='hover:underline cursor-pointer'>Write a review</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-4'>
                <GalleryImage imageUrlLocations={imageUrlLocations} />
            </div>
        </div>
    )
}

export default InformationDetail