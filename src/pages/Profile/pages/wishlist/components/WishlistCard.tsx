import { useRef } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import { FreeMode, Navigation, Thumbs } from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

import { LocationTypo } from "@/components/common/LocationTypo"
import { HOTEL_BOOKING_PATH, SEARCH_PATH } from "@/routes/path"
import { ILocation } from "@/types/responses/hotel/hotelBooking.res.type"
import { Rate } from "antd"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
interface IWishlistCardProps {
    location: ILocation
}
function WishlistCard({ location }: IWishlistCardProps) {

    const navigate = useNavigate()
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const onNavigateToLocationSearch = () => {
        const startDate = dayjs().add(1, 'day').add(7, 'hour').format("YYYY-MM-DD")
        const endDate = dayjs().add(2, 'day').add(7, 'hour').format("YYYY-MM-DD")
        const route = location?.isHotel ? `/${HOTEL_BOOKING_PATH.DEFAULT}/${location.hotel.id}?start=${startDate}&end=${endDate}&room=1&person=2` : `${SEARCH_PATH.DEFAULT}/${location.id}`
        navigate(route)
    }

    return (
        <div className="p-4 border border-gray-300/50 rounded-md flex flex-col gap-y-2 cursor-pointer" onClick={onNavigateToLocationSearch}>
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-xl">{location?.name}</h3>
                <div className="flex items-center gap-x-4">
                    <Rate value={location.rating} disabled />
                </div>
            </div>
            <span className="text-sm">{location?.description}</span>
            <span className="text-sm">Reviews count: {location?.reviewCount}</span>
            <div className="flex items-center gap-x-2">
                <span>Address : </span>
                <LocationTypo
                    country={location.address?.country?.name}
                    province={location.address?.province?.name}
                    district={location.address?.district?.name}
                    ward={location.address?.ward?.name}
                    streetAddress={location.address?.streetAddress}
                />
            </div>
            <div >
                <div className="relative">
                    <Swiper
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper mt-4 rounded-md h-[70px]"
                    >
                        {location.imageUrlLocations && location.imageUrlLocations?.map((url: string, index: number) =>
                            <SwiperSlide key={index}>
                                <img src={url} className="rounded-md w-full h-full object-cover cursor-pointer" />
                            </SwiperSlide>
                        )}
                    </Swiper>
                    {location.imageUrlLocations && location.imageUrlLocations.length > 0 && <div ref={navigationPrevRef}
                        className="cursor-pointer z-50 absolute top-1/2 -translate-y-1/2 -left-4 w-5 h-5 flex items-center 
                justify-center bg-black rounded-[50%] hover:bg-white group transition-all">
                        <AiOutlineArrowLeft size={12} color="white" className="group-hover:text-black" />
                    </div>}

                    {location.imageUrlLocations && location.imageUrlLocations.length > 3 && <div ref={navigationNextRef}
                        className="cursor-pointer z-50 absolute top-1/2 -translate-y-1/2 -right-4 w-5 h-5 flex items-center
                  justify-center bg-black rounded-[50%] hover:bg-white group transition-all">
                        <AiOutlineArrowRight size={12} color="white" className="group-hover:text-black" />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default WishlistCard