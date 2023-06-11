import { AppContext } from "@/App"
import { uniqBy } from "lodash"
import { createContext, useContext, useEffect, useState } from "react"

import { HotelRoom, RoomFeature, RoomType } from "@/interfaces/hotel"
import { getRoomsOfHotel } from "@/service/api/hotel"
import { IBreadcrumbItem } from '@/types/hotel-booking'
import { IHotelBooking, ILocation, IPropertyAmenity, IRoom } from "@/types/responses/hotel/hotelBooking.res.type"
import { getHotelBookingById } from "@/utils/http"
import { NonIndexRouteObject, useNavigate, useParams } from 'react-router-dom'
import About from '../About'
import Breadcrumbs from './components/Breadcrumbs'
import InformationDetail from './components/InformationDetail'
import PopularNeaby from './components/PopularNearBy'
import ViewPrice from './components/ViewPrice'
import { Modal } from "antd"
import PopupRoomDetail from "./components/PopupRoomDetail"
import type { Dayjs as DayjsType } from "dayjs"
import { IWishlist } from "@/types/responses/user/wishlist.res.type"
import { getWishlist } from "@/service/api/user/getWishlist.api"
import { getActiveWishlist } from "../Search/pages/LocationSearchResultById"
import { addToWishlist, removeFromWishlist } from "@/service/api/location"

const DUMMY_BREADCRUM: IBreadcrumbItem[] = [
    {
        href: "",
        name: "Asia"
    },
    {
        href: "",
        name: "Quang Nam Province"
    },
    {
        href: "",
        name: "Duy Hai"
    },
    {
        href: "",
        name: "Duy Hai Hotels"
    },
]

interface IHotelBookingContext {
    onViewDetailDeal: (roomId: string, startDate: DayjsType, endDate: DayjsType, roomNumber: number, personNumber: number) => void;
}

export const HotelBookingContext = createContext<IHotelBookingContext | null>(null)

function HotelBooking() {
    const { setLoading } = useContext(AppContext)

    const navigate = useNavigate()
    const params = useParams()

    const [isRefetch, setIsRefetch] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [hotelBooking, setHotelBooking] = useState<IHotelBooking>()

    const [wishlist, setWishlist] = useState<IWishlist[]>([])
    const [listRoom, setListRoom] = useState<HotelRoom[]>([])
    const [listRoomType, setListRoomType] = useState<RoomType[]>([])
    const [listRoomFeature, setListRoomFeature] = useState<RoomFeature[]>([])

    const [roomDetail, setRoomDetail] = useState<HotelRoom>()
    const [paramsRoomDetail, setParamsRoomDetail] = useState<any>()

    const activeWishlist = getActiveWishlist(wishlist, hotelBooking?.location?.id as string)
    const isActiveWishlist = activeWishlist ? true : false

    const onOpenModal = () => {
        setIsOpenModal(true)
    }

    const onCloseModal = () => {
        setIsOpenModal(false)
    }

    const onViewDetailDeal = (roomId: string, startDate: DayjsType, endDate: DayjsType, roomNumber: number, personNumber: number) => {
        const room = listRoom.find(room => room.id === roomId)
        setParamsRoomDetail({ startDate, endDate, roomNumber, personNumber, roomId })

        if (!!room) setRoomDetail(room)

        onOpenModal()
    }

    const onClickWishlist = async () => {
        try {
            if (!isActiveWishlist) await addToWishlist(hotelBooking?.location?.id as string)
            else {
                const idWishlist = activeWishlist?.id
                await removeFromWishlist(idWishlist as string)
            }
            setIsRefetch(prev => !prev)
        } catch (error) {
            console.log({ error })
        }
    }

    const createHotelBooking = () => {
        navigate(`/booking/checkout/${params?.id}&roomId=${paramsRoomDetail?.roomId}&startDate=${paramsRoomDetail?.startDate?.format("YYYY-MM-DD")}&endDate=${paramsRoomDetail?.endDate?.format("YYYY-MM-DD")}&roomNumber=${paramsRoomDetail?.roomNumber}&personNumber=${paramsRoomDetail?.personNumber}`)
    }

    useEffect(() => {
        setLoading(true)

        const promises: Promise<any>[] = []
        promises[0] = getHotelBookingById(params?.id as string)
        promises[1] = getRoomsOfHotel(params?.id as string)
        promises[2] = getWishlist()
        Promise.all(promises).then(res => {
            const hotelBooking = res[0]
            const hotelRoom: HotelRoom[] = res[1]
            const wishlist: IWishlist[] = res[2]
            setHotelBooking(hotelBooking)

            const roomTypes: RoomType[] = hotelRoom?.map((hotelRoom: HotelRoom) => hotelRoom.roomTypes[0])

            const roomFeatures: RoomFeature[] = hotelRoom?.reduce((result: RoomFeature[], current: HotelRoom) => result.concat(current.roomFeatures), [])

            setWishlist(wishlist)
            setListRoom(uniqBy(hotelRoom, 'id'))
            setListRoomType(uniqBy(roomTypes, 'id'))
            setListRoomFeature(uniqBy(roomFeatures, 'id'))
        })

        setLoading(false)
    }, [isRefetch])

    return (

        <HotelBookingContext.Provider value={{ onViewDetailDeal }}>
            <div className='w-full'>
                <Breadcrumbs routes={DUMMY_BREADCRUM} />
                <div className='mt-10'>
                    <InformationDetail
                        location={hotelBooking?.location as ILocation}
                        email={hotelBooking?.email as string}
                        phoneNumber={hotelBooking?.phoneNumber as string}
                        imageUrlLocations={hotelBooking?.location?.imageUrlLocations as string[]}
                        isActiveWishlist={isActiveWishlist}
                        onClickWishlist={onClickWishlist}
                    />
                </div>
                <div className='mt-4'>
                    <ViewPrice rooms={hotelBooking?.rooms as IRoom[]} />
                </div>
                <div className='mt-4'>
                    <About
                        aboutText={hotelBooking?.location?.about as string}
                        propertyAmenities={hotelBooking?.propertyAmenities as IPropertyAmenity[]}
                        listRoomType={listRoomType}
                        listRoomFeature={listRoomFeature}
                        rating={hotelBooking?.location?.rating as number}
                        reviewCount={hotelBooking?.location?.reviewCount as number}
                    />
                </div>
                <div className='mt-4'>
                    <PopularNeaby />
                </div>
            </div>
            <Modal
                okText="Ok"
                open={isOpenModal}
                onCancel={onCloseModal}
                onOk={createHotelBooking}
                className="min-w-[60rem]"
            >
                <div className="p-4">
                    <PopupRoomDetail roomDetail={roomDetail as HotelRoom} />
                </div>
            </Modal>
        </HotelBookingContext.Provider>

    )
}

export default HotelBooking