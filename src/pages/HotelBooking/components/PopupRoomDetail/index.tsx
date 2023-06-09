import { useRef, useState, useEffect } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import { FreeMode, Navigation, Thumbs } from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { HotelRoom } from "@/interfaces/hotel"
import GuessQuantity from "@/components/common/GuessQuantity"

interface IPopupRoomDetailProps {
    roomDetail: HotelRoom
}

export default function PopupRoomDetail({ roomDetail }: IPopupRoomDetailProps) {
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const [image, setImage] = useState("")

    useEffect(() => {
        setImage(roomDetail?.roomImages?.[0]?.imageUrl)
    }, [roomDetail?.roomImages])

    return (
        <div className="grid grid-cols-2 gap-x-4">
            <div>
                <div className="w-full h-[200px]">
                    <img src={image} alt="img location" className="w-full h-full object-cover" />
                </div>

                <div className="relative">
                    <Swiper
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper mt-4 rounded-md h-[50px]"
                    >
                        {roomDetail?.roomImages && roomDetail?.roomImages?.map((item, index: number) =>
                            <SwiperSlide key={index}>
                                <img src={item?.imageUrl} className="rounded-md w-full h-full object-cover cursor-pointer" onClick={() => setImage(item?.imageUrl)} />
                            </SwiperSlide>
                        )}
                    </Swiper>
                    <div ref={navigationPrevRef}
                        className="cursor-pointer z-50 absolute top-1/2 -translate-y-1/2 -left-4 w-7 h-7 flex items-center 
                justify-center bg-black rounded-[50%] hover:bg-white group transition-all">
                        <AiOutlineArrowLeft size={14} color="white" className="group-hover:text-black" />
                    </div>
                    <div ref={navigationNextRef}
                        className="cursor-pointer z-50 absolute top-1/2 -translate-y-1/2 -right-4 w-7 h-7 flex items-center
                  justify-center bg-black rounded-[50%] hover:bg-white group transition-all">
                        <AiOutlineArrowRight size={14} color="white" className="group-hover:text-black" />
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <span className="font-bold">Room Feature</span>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {roomDetail?.roomFeatures?.map((roomFeature, index: number) =>
                            <div className="flex items-center gap-x-2" key={index}>
                                <img src={roomFeature.icon} alt="icon" className="w-5 h-5" />
                                <span className="text-sm text-gray-600">{roomFeature.name}</span>
                            </div>)}
                    </div>
                </div>

                <div className="mt-6">
                    <span className="font-bold">Room Private</span>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {roomDetail?.roomBeds?.map((roomBed, index: number) =>
                            <div className="flex items-center gap-x-2" key={index}>
                                <img src={roomBed.bed.icon} alt="icon" className="w-5 h-5" />
                                <span className="text-sm text-gray-600">number of bed: {roomBed.numberOfBeds}</span>
                            </div>)}
                    </div>
                </div>

                <div className="mt-6">
                    <span className="font-bold">Room Types</span>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {roomDetail?.roomTypes?.map((roomType, index: number) =>
                            <div className="flex items-center gap-x-2" key={index}>
                                <img src={roomType.icon} alt="icon" className="w-5 h-5" />
                                <span className="text-sm text-gray-600">number of bed: {roomType.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-x-2">
                    <span className="font-bold">Sleeps:</span>
                    <GuessQuantity quantity={roomDetail?.sleeps} />
                </div>
                <div className="mt-6 flex items-center gap-x-2">
                    <span className="font-bold">Is prepay</span>
                    <span>{roomDetail?.isPrepay ? 'Yes' : 'No'}</span>
                </div>
                <div className="mt-6 flex items-center gap-x-2">
                    <span className="font-bold">Is FreeCancellation</span>
                    <span>{roomDetail?.isPrepay ? 'Yes' : 'No'}</span>
                </div>
            </div>

        </div>

    )
}