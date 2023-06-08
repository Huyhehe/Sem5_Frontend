import GuessQuantity from "@/components/common/GuessQuantity"
import ImageIcon from "@/components/common/ImageIcon"
import { LocationTypo } from "@/components/common/LocationTypo"
import TypographyText from "@/components/common/TypographyText"
import TypographyTitle from "@/components/common/TypographyTitle"
import { Hotel } from "@/interfaces/hotel"
import { getHotel, getRoomsOfHotel, requestPublish } from "@/service/api/hotel"
import { HotelRoomsResponse } from "@/types/responses/hotel"
import { currencyFormatter } from "@/utils/reusable"
import { Button, Checkbox, Divider, message } from "antd"
import { useContext, useEffect, useState } from "react"
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom"
import { OutletContextType } from "./outletContext.type"
import { AppContext } from "@/App"

const ConfirmPublish = () => {
  const { updateCurrentStep } = useOutletContext<OutletContextType>()
  const { setLoading } = useContext(AppContext)
  const navigator = useNavigate()
  const [queryString] = useSearchParams()
  const [hotel, setHotel] = useState<Hotel>()
  const [rooms, setRooms] = useState<HotelRoomsResponse>([])
  const [isAgreed, setIsAgreed] = useState(false)
  useEffect(() => {
    updateCurrentStep(3)
    const fetchHotel = async () => {
      try {
        const hotel = await getHotel(String(queryString.get("id")))
        setHotel(hotel)
      } catch (error: any) {
        message.error(error.message)
      }
    }
    const fetchRooms = async () => {
      try {
        const rooms = await getRoomsOfHotel(String(queryString.get("id")))
        setRooms(rooms)
      } catch (error: any) {
        message.error(error.message)
      }
    }
    fetchHotel()
    fetchRooms()
  }, [])

  const handlePublish = async () => {
    try {
      setLoading(true)
      await requestPublish(String(queryString.get("id")))
      setLoading(false)
      message.success("Request publish successfully")
      navigator("/profile/business")
    } catch (error: any) {
      setLoading(false)
      message.success(error.message)
    }
  }

  return (
    <>
      <div>
        <TypographyTitle
          level={2}
          text="Overview"
          className="font-black mb-4"
        />
        <div className="flex justify-between">
          <TypographyTitle
            level={3}
            text={`Name: ${hotel?.location?.name}`}
            className="font-black"
          />
          <div className="text-grey-300 flex flex-col items-end">
            <TypographyText text={String(hotel?.phoneNumber)} />
            {hotel?.email && <TypographyText text={hotel?.email} />}
            <LocationTypo
              textClassName="text-[1rem] text-grey-300"
              country={hotel?.location?.address?.country?.name}
              province={hotel?.location?.address?.province?.name}
              district={hotel?.location?.address?.district?.name}
              ward={hotel?.location?.address?.ward?.name}
              streetAddress={hotel?.location?.address?.streetAddress}
            />
          </div>
        </div>
        <Divider orientation="left">
          <strong>Rooms</strong>
        </Divider>
        {rooms?.map((room) => {
          return (
            <div key={room.id}>
              <div className="flex justify-between">
                <div>
                  <TypographyTitle
                    level={4}
                    text={`${room.roomTypes?.[0]?.name} Room`}
                    className="font-black"
                  />
                  <div className="flex items-center gap-1">
                    {room.roomBeds?.map((roomBed) => {
                      return (
                        <ImageIcon
                          key={roomBed.id}
                          icon={roomBed.bed?.icon}
                          name={roomBed?.bed?.type}
                          className="w-6"
                        />
                      )
                    })}
                    <Divider type="vertical" className="bg-black" />
                    <GuessQuantity quantity={room?.sleeps} />
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <TypographyText
                    className="font-bold text-dollar"
                    text={`VND ${currencyFormatter(room?.price)}`}
                  />
                  <TypographyText
                    text={
                      <span>
                        Free cancelling:{" "}
                        {room.isFreeCancellation ? (
                          <strong className="text-dollar">Yes</strong>
                        ) : (
                          <strong className="text-error">No</strong>
                        )}
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="flex gap-3 flex-wrap mt-2">
                {room?.roomFeatures?.map((features) => {
                  return (
                    <ImageIcon
                      key={features.id}
                      icon={features.icon}
                      name={features.name}
                      className="w-6"
                    />
                  )
                })}
              </div>
              <Divider />
            </div>
          )
        })}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex gap-1">
          <TypographyTitle
            level={4}
            text="Commission percentage:"
            className="font-black mb-4"
          />
          <TypographyTitle
            level={4}
            text="15%"
            className="font-black mb-4 text-dollar"
          />
        </div>
        <Checkbox
          className="mb-2"
          onChange={(e) => {
            setIsAgreed(e.target.checked)
          }}
        >
          {`This Hotel Owner-Web Admin Agreement ("Agreement") is entered into
          between `}
          <strong>{hotel?.location?.name}</strong>, hereinafter referred to as
          the <strong>Hotel Owner</strong>, and <strong>Web Admin</strong>,
          hereinafter referred to as the <strong>Web Admin</strong> collectively
          referred to as the <strong className="text-base">Parties</strong>. The
          <strong>Hotel Owner</strong> engages the <strong>Web Admin</strong> to
          design, develop, maintain, and update the {"hotel's"} website. The
          <strong>Web Admin</strong> shall be responsible for creating a
          professional and user-friendly website, managing and updating its
          content, providing technical support and maintenance, and integrating
          a secure booking system. The <strong>Hotel Owner</strong>
          agrees to cooperate with the <strong>Web Admin</strong>, provide
          necessary information and instructions, and communicate effectively
          throughout the process. Both Parties acknowledge their commitment to
          working together to ensure the successful establishment and operation
          of the {"hotel's"} online presence.
        </Checkbox>

        <Button
          className="ml-auto border-base text-base hover:bg-base hover:text-white"
          disabled={!isAgreed}
          onClick={handlePublish}
        >
          Request Publish
        </Button>
      </div>
    </>
  )
}

export default ConfirmPublish
