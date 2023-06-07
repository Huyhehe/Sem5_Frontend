import { useRef } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import { FreeMode, Navigation, Thumbs } from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export default function GalleryImage() {
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)
    return (
        <>
            <div className="relative">
                <Swiper
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    spaceBetween={10}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2 w-full h-[550px] rounded-md "
                >
                    {new Array(10).fill('').map((_, index: number) =>
                        <SwiperSlide key={index}>
                            <img src="https://d3lf10b5gahyby.cloudfront.net/campaignitinerary/sun-siyam-iru-fushi-maldives-resort.jpg" className="rounded-md w-full h-full object-cover" />
                        </SwiperSlide>
                    )}
                </Swiper>
                <div ref={navigationPrevRef}
                    className="cursor-pointer z-50 absolute top-1/2 -translate-y-1/2 -left-4 w-10 h-10 flex items-center 
                justify-center bg-black rounded-[50%] hover:bg-white group transition-all">
                    <AiOutlineArrowLeft size={22} color="white" className="group-hover:text-black" />
                </div>
                <div ref={navigationNextRef}
                    className="cursor-pointer z-50 absolute top-1/2 -translate-y-1/2 -right-4 w-10 h-10 flex items-center
                  justify-center bg-black rounded-[50%] hover:bg-white group transition-all">
                    <AiOutlineArrowRight size={22} color="white" className="group-hover:text-black" />
                </div>
            </div>

            <Swiper
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-4 rounded-md "
            >
                <SwiperSlide className="h-[120px]">
                    <img src="https://maldivestourism.in/wp-content/uploads/delhi-to-maldives-tour-packages-all-inclusive-cost-deals-itinerary.jpg" className="rounded-md" />
                </SwiperSlide>
                <SwiperSlide className="h-[120px]">
                    <img src="https://maldivestourism.in/wp-content/uploads/delhi-to-maldives-tour-packages-all-inclusive-cost-deals-itinerary.jpg" className="rounded-md" />
                </SwiperSlide>
                <SwiperSlide className="h-[120px]">
                    <img src="https://maldivestourism.in/wp-content/uploads/delhi-to-maldives-tour-packages-all-inclusive-cost-deals-itinerary.jpg" className="rounded-md" />
                </SwiperSlide>
                <SwiperSlide className="h-[120px]">
                    <img src="https://maldivestourism.in/wp-content/uploads/delhi-to-maldives-tour-packages-all-inclusive-cost-deals-itinerary.jpg" className="rounded-md" />
                </SwiperSlide>
                <SwiperSlide className="h-[120px]">
                    <img src="https://maldivestourism.in/wp-content/uploads/delhi-to-maldives-tour-packages-all-inclusive-cost-deals-itinerary.jpg" className="rounded-md" />
                </SwiperSlide>
            </Swiper>

        </>
    )
}