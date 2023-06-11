import TypographyText from "@/components/common/TypographyText"
import TypographyTitle from "@/components/common/TypographyTitle"
import dayjs from "dayjs"
import useUser from "@/hooks/useUser"
import { deleteBooking, getBookingForOwner } from "@/service/api/booking"
import { BookingResponse } from "@/types/responses/booking"
import { Divider, Empty, Image, Modal, Spin, message } from "antd"
import { useContext, useEffect, useState } from "react"
import { BsDot } from "react-icons/bs"
import { currencyFormatter, wordTransformByQuantity } from "@/utils/reusable"
import { AiFillPhone } from "react-icons/ai"
import { MdEmail } from "react-icons/md"
import { AppContext } from "@/App"

const ManageBooking = () => {
  const userInfo = useUser()
  const { setLoading } = useContext(AppContext)
  const [bookings, setBookings] = useState<BookingResponse[]>([])
  const [currentBooking, setCurrentBooking] = useState<BookingResponse>()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const fetchBookingHistoryForHotelOwner = async () => {
    try {
      const bookings = await getBookingForOwner()
      setBookings(bookings)
      console.log(bookings)
    } catch (error) {
      message.error("Cannot fetch booking history")
    }
  }

  const handleCancelBooking = async (bookingId: string) => {
    try {
      setLoading(true)
      await deleteBooking(bookingId)
      setIsModalVisible(false)
      setLoading(false)
      setCurrentBooking(undefined)
      fetchBookingHistoryForHotelOwner()
      message.success("Cancel booking successfully")
    } catch (error) {
      setLoading(false)
      message.error("Cancel booking failed")
    }
  }

  useEffect(() => {
    if (userInfo?.isSale) {
      fetchBookingHistoryForHotelOwner()
    }
  }, [])

  return userInfo?.isSale ? (
    <div>
      {bookings.map((booking) => (
        <div
          className="flex shadow-custom rounded-md mb-4 cursor-pointer overflow-hidden"
          key={booking?.id}
          onClick={() => {
            setCurrentBooking(booking)
            setIsModalVisible(true)
          }}
        >
          <div className="flex flex-col">
            <div className="flex gap-4">
              <img
                src={
                  booking?.bookingRooms?.[0]?.room?.hotel?.location
                    ?.locationImages?.[0]?.imageUrl
                }
                alt="hotel"
                className="w-32 h-32"
              />
              <div className="flex flex-col gap-2 py-2">
                <TypographyTitle
                  level={4}
                  text={booking?.bookingRooms?.[0]?.room?.hotel?.location?.name}
                />
                <div className="flex items-center">
                  <TypographyText
                    text={`${dayjs(booking?.checkIn).format(
                      "ddd, D MMMM YYYY"
                    )} - ${dayjs(booking?.checkOut).format(
                      "ddd, D MMMM YYYY"
                    )}`}
                  />
                  <BsDot />
                  <TypographyText
                    text={`${booking?.bookingRooms?.[0]?.room?.hotel?.location?.address?.district?.name}, ${booking?.bookingRooms?.[0]?.room?.hotel?.location?.address?.province?.name}`}
                  />
                </div>
                {booking?.isPaid ? (
                  <span className="font-bold text-sm text-dollar">
                    Guess had paid for this booking
                  </span>
                ) : (
                  <span className="font-bold text-sm text-error">
                    Guess had not paid for this booking
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between ml-auto mr-4 py-2">
            <TypographyTitle
              level={4}
              text={`VND ${currencyFormatter(
                Number(booking?.totalAmount || 0)
              )}`}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {`#${booking?.CustomerName}`}
              </span>
              <img
                src={booking?.user?.profileImageUrl}
                className="w-10 aspect-square rounded-full"
              />
            </div>
          </div>
        </div>
      ))}
      <Modal
        open={isModalVisible}
        okText="Cancel this booking"
        cancelText="Close"
        onOk={() => {
          handleCancelBooking(String(currentBooking?.id))
        }}
        onCancel={() => {
          setCurrentBooking(undefined)
          setIsModalVisible(false)
        }}
      >
        {currentBooking ? (
          <div className="flex justify-between w-full mb-4">
            <div className="basis-[49%] flex flex-col p-4 gap-1">
              <div className="text-md flex items-center gap-2">
                <img
                  src={currentBooking?.user?.profileImageUrl}
                  className="w-10 aspect-square rounded-full"
                />{" "}
                <span className="text-sm text-gray-500">
                  {`#${currentBooking?.CustomerName}`}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <AiFillPhone size={20} />
                <TypographyText
                  text={currentBooking?.user?.phoneNumber || "No phone number"}
                />
              </div>
              <div className="flex items-center gap-1 mb-[3px]">
                <MdEmail size={20} />
                <TypographyText
                  text={currentBooking?.user?.email || "No Email"}
                />
              </div>
              <Divider className="mt-0" />
              <TypographyTitle level={5} text="Guess denied contact?" />
              <TypographyText text="In case can't contact with guess, cancel this booking to make sure revenue won't be wrong!" />
            </div>
            <span className="w-[1px] h-[30rem] bg-border"></span>
            <div className="flex flex-col basis-[49%] p-4 gap-2">
              <div className="flex flex-col">
                <span>
                  Confirmation number:{" "}
                  <strong>{currentBooking?.id.split("-")?.[0]}</strong>
                </span>
                <span>
                  PIN code:{" "}
                  <strong>{currentBooking?.id.split("-")?.[2]}</strong>
                </span>
              </div>
              <Divider />
              <div className="flex flex-col">
                <span className="text-sm">Check-in:</span>
                <TypographyTitle
                  level={5}
                  text={dayjs(currentBooking?.checkIn).format(
                    "dddd, MMMM D, YYYY"
                  )}
                />
                <span className="text-sm">from 2:00 PM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Check-out:</span>
                <TypographyTitle
                  level={5}
                  text={dayjs(currentBooking?.checkOut).format(
                    "dddd, MMMM D, YYYY"
                  )}
                />
                <span className="text-sm">until 12:00 PM</span>
              </div>
              <Divider />
              <div className="flex flex-col">
                <span className="text-sm">Price</span>
                <TypographyTitle
                  level={5}
                  text={`${dayjs(currentBooking?.checkOut)?.diff(
                    dayjs(currentBooking?.checkIn),
                    "day"
                  )} ${wordTransformByQuantity(
                    "night",
                    dayjs(currentBooking?.checkOut)?.diff(
                      dayjs(currentBooking?.checkIn),
                      "day"
                    )
                  )}`}
                />
                <TypographyTitle
                  level={3}
                  text={`VND ${currencyFormatter(
                    Number(currentBooking?.totalAmount)
                  )}`}
                  className="text-dollar"
                />
                <span className="text-sm text-gray-400">
                  {"This price doesn't include taxes and fees."}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[30rem] flex justify-center items-center">
            <Spin />
          </div>
        )}
      </Modal>
    </div>
  ) : (
    <div>
      <Empty description="You are not a hotel owner" />
    </div>
  )
}

export default ManageBooking
