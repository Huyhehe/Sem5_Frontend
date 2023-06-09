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

interface IGalleryImageProps {
    imageUrlLocations: string[]
}

export default function GalleryImage({ imageUrlLocations }: IGalleryImageProps) {
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const [image, setImage] = useState("")

    useEffect(() => {
        setImage(imageUrlLocations?.[0])
    }, [imageUrlLocations])

    return (
        <>
            <div className="w-full h-[550px]">
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
                    className="mySwiper mt-4 rounded-md h-[150px]"
                >
                    {imageUrlLocations && imageUrlLocations?.map((url: string, index: number) =>
                        <SwiperSlide key={index}>
                            <img src={url} className="rounded-md w-full h-full object-cover cursor-pointer" onClick={() => setImage(url)} />
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
        </>
    )
}