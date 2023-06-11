import TypographyText from "@/components/common/TypographyText"
import TypographyTitle from "@/components/common/TypographyTitle"
import { getMyBookingHistory } from "@/service/api/booking"
import { BookingResponse } from "@/types/responses/booking/booking.res.type"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { BsDot } from "react-icons/bs"
import { currencyFormatter } from "@/utils/reusable"

const MyBooking = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([])
  const fetchBookingHistory = async () => {
    try {
      const response = await getMyBookingHistory()
      setBookings(response)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBookingHistory()
  }, [])
  return (
    <>
      {bookings.map((booking) => (
        <div
          className="flex shadow-custom rounded-md mb-4 cursor-pointer"
          key={booking?.id}
          onClick={() => {
            window.location.href = `/booking/history/${booking?.id}`
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
                className="w-32 h-32 rounded-md"
              />
              <div className="flex flex-col gap-2">
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
                    You have paid for this booking
                  </span>
                ) : (
                  <span className="font-bold text-sm text-error">
                    You have not paid for this booking
                  </span>
                )}
              </div>
            </div>
          </div>
          <TypographyTitle
            level={4}
            text={`VND ${currencyFormatter(Number(booking?.totalAmount || 0))}`}
            className="ml-auto mr-4"
          />
        </div>
      ))}
    </>
  )
}

export default MyBooking
