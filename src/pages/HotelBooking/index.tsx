import { AppContext } from "@/App"
import { uniqBy } from "lodash"
import { createContext, useContext, useEffect, useState } from "react"

import { HotelRoom, RoomFeature, RoomType } from "@/interfaces/hotel"
import { getRoomsOfHotel } from "@/service/api/hotel"
import { addToWishlist, removeFromWishlist } from "@/service/api/location"
import {
  IHotelBooking,
  ILocation,
  IPropertyAmenity
} from "@/types/responses/hotel/hotelBooking.res.type"
import { IWishlist } from "@/types/responses/user/wishlist.res.type"
import { getHotelBookingById } from "@/utils/http"
import { Modal } from "antd"
import type { Dayjs as DayjsType } from "dayjs"
import dayjs from "dayjs"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import InformationDetail from '../HotelBooking/components/InformationDetail'
import { getActiveWishlist } from "../Search/pages/LocationSearchResultById"
import UserReviewContainer from "../Search/pages/LocationSearchResultById/components/UserReviewContainer"
import About from "./components/About"
import PopupRoomDetail from "./components/PopupRoomDetail"
import ViewPrice from "./components/ViewPrice"
import "./styles/index.css"

interface IHotelBookingContext {
  onViewDetailDeal: (
    roomId: string,
    startDate: DayjsType,
    endDate: DayjsType,
    roomNumber: number,
    personNumber: number
  ) => void
}

export const HotelBookingContext = createContext<IHotelBookingContext | null>(
  null
)

function HotelBooking() {
  const { setLoading } = useContext(AppContext)

  const navigate = useNavigate()
  const params = useParams()
  const [searchParams] = useSearchParams()

  const [isRefetch, setIsRefetch] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [hotelBooking, setHotelBooking] = useState<IHotelBooking>()

  const [listRoom, setListRoom] = useState<HotelRoom[]>([])
  const [listRoomType, setListRoomType] = useState<RoomType[]>([])
  const [listRoomFeature, setListRoomFeature] = useState<RoomFeature[]>([])
  const { start, end, room, person } = Object.fromEntries(
    searchParams.entries()
  )

  const isActiveWishlist = getActiveWishlist(hotelBooking?.location?.wishList as any[])

  const [roomDetail, setRoomDetail] = useState<HotelRoom>()
  const [paramsRoomDetail, setParamsRoomDetail] = useState<any>()

  const onOpenModal = () => {
    setIsOpenModal(true)
  }

  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  const onViewDetailDeal = (
    roomId: string,
    startDate: DayjsType,
    endDate: DayjsType,
    roomNumber: number,
    personNumber: number
  ) => {
    const room = listRoom.find((room) => room.id === roomId)
    setParamsRoomDetail({
      startDate,
      endDate,
      roomNumber,
      personNumber,
      roomId,
    })

    if (!!room) setRoomDetail(room)

    onOpenModal()
  }

  const onClickWishlist = async () => {
    try {
      if (!isActiveWishlist) await addToWishlist(hotelBooking?.location?.id as string)
      else await removeFromWishlist(hotelBooking?.location?.wishList?.[0]?.id as string)
      setIsRefetch(prev => !prev)
    } catch (error) {
      console.log({ error })
    }
  }

  const createHotelBooking = () => {
    navigate(
      `/booking/checkout?hotelId=${params?.id}&roomId=${paramsRoomDetail?.roomId
      }&startDate=${paramsRoomDetail?.startDate?.format(
        "YYYY-MM-DD"
      )}&endDate=${paramsRoomDetail?.endDate?.format("YYYY-MM-DD")}&room=${paramsRoomDetail?.roomNumber
      }&person=${paramsRoomDetail?.personNumber}`
    )
  }

  useEffect(() => {
    setLoading(true)

    const promises: Promise<any>[] = []
    promises[0] = getHotelBookingById(params?.id as string)
    promises[1] = getRoomsOfHotel(params?.id as string, {
      checkIn: dayjs(start).format("YYYY-MM-DD"),
      checkOut: dayjs(end).format("YYYY-MM-DD"),
      sleeps: Number(person),
      numberOfRooms: Number(room),
    })
    Promise.all(promises).then((res) => {
      const hotelBooking = res[0]
      const hotelRoom: HotelRoom[] = res[1]

      setListRoom(hotelRoom)

      setHotelBooking(hotelBooking)

      const roomTypes: RoomType[] = hotelRoom?.map(
        (hotelRoom: HotelRoom) => hotelRoom.roomTypes[0]
      )

      const roomFeatures: RoomFeature[] = hotelRoom?.reduce(
        (result: RoomFeature[], current: HotelRoom) =>
          result.concat(current.roomFeatures),
        []
      )

      setListRoom(uniqBy(hotelRoom, "id"))
      setListRoomType(uniqBy(roomTypes, "id"))
      setListRoomFeature(uniqBy(roomFeatures, "id"))
    })

    setLoading(false)
  }, [searchParams, isRefetch])

  return (
    <HotelBookingContext.Provider value={{ onViewDetailDeal }}>
      <div className="w-full">
        <div className="mt-10">
          <InformationDetail
            location={hotelBooking?.location as ILocation}
            email={hotelBooking?.email as string}
            phoneNumber={hotelBooking?.phoneNumber as string}
            imageUrlLocations={
              hotelBooking?.location?.imageUrlLocations as string[]
            }
            isActiveWishlist={isActiveWishlist}
            onClickWishlist={onClickWishlist}
          />
        </div>
        <div className="mt-4">
          <ViewPrice rooms={listRoom} />
        </div>
        <div className="mt-4">
          <About
            aboutText={hotelBooking?.location?.about as string}
            propertyAmenities={
              hotelBooking?.propertyAmenities as IPropertyAmenity[]
            }
            listRoomType={listRoomType}
            listRoomFeature={listRoomFeature}
            rating={hotelBooking?.location?.rating as number}
            reviewCount={hotelBooking?.location?.reviewCount as number}
          />
        </div>
        <div>
          <UserReviewContainer locationId={hotelBooking?.location?.id || ""} />
        </div>
      </div>
      <Modal
        okText="Book"
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
