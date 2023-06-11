import { inProgressHotel as hotelFallback } from "@/assets/images"
import TypographyText from "@/components/common/TypographyText"
import TypographyTitle from "@/components/common/TypographyTitle"
import { deleteBooking, getBookingDetail } from "@/service/api/booking"
import { BookingResponse } from "@/types/responses/booking"
import { currencyFormatter, wordTransformByQuantity } from "@/utils/reusable"
import { Button, Divider, Image, Modal, Spin, message } from "antd"
import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import { AiFillPhone } from "react-icons/ai"
import { MdEmail } from "react-icons/md"
import { useParams } from "react-router-dom"
import "../../styles/index.css"
import { AppContext } from "@/App"

const BookingHistoryDetail = () => {
  const { setLoading } = useContext(AppContext)
  const { id } = useParams()
  const [booking, setBooking] = useState<BookingResponse>()
  const [groupVisible, setGroupVisible] = useState(false)
  const [cancelModalVisible, setCancelModalVisible] = useState(false)

  const fetchBookingHistory = async () => {
    try {
      const response = await getBookingDetail(String(id))
      setBooking(response)
    } catch (error: any) {
      message.error("Cannot fetch booking history")
      window.location.href = "/profile/my-bookings"
    }
  }
  const handleCancelBooking = async () => {
    try {
      setLoading(true)
      await deleteBooking(String(booking?.id))
      setLoading(false)
      message.success("Cancel booking successfully")
      window.location.href = "/profile/my-bookings"
    } catch (error) {
      setLoading(false)
      message.error("Cancel booking failed")
    }
    setCancelModalVisible(false)
  }
  useEffect(() => {
    if (!id) {
      window.location.href = "/profile/my-bookings"
    } else {
      fetchBookingHistory()
    }
  }, [])

  return booking ? (
    <div>
      <div className="flex rounded-lg border w-full h-[30rem] mb-4">
        <div className="basis-[33%] flex flex-col p-4 gap-2">
          <Image
            className="object-cover aspect-[20/9] rounded-md"
            preview={{ visible: false }}
            src={
              booking?.bookingRooms?.[0]?.room?.roomImages?.[0]?.imageUrl ||
              hotelFallback
            }
            onClick={() => setGroupVisible(true)}
          />
          <div className="hidden">
            <Image.PreviewGroup
              preview={{
                visible: groupVisible,
                onVisibleChange: (vis) => setGroupVisible(vis),
              }}
            >
              {booking?.bookingRooms?.[0]?.room?.roomImages?.map((image) => {
                return <Image key={image.id} src={image.imageUrl} />
              })}
            </Image.PreviewGroup>
          </div>
          <div className="text-md flex flex-col">
            <span>Address:</span>
            <span className="font-bold">
              {`${booking?.bookingRooms?.[0]?.room?.hotel?.location?.address?.streetAddress} ${booking?.bookingRooms?.[0]?.room?.hotel?.location?.address?.district?.name} ${booking?.bookingRooms?.[0]?.room?.hotel?.location?.address?.province?.name}`}
            </span>
          </div>
          <Divider />
          <TypographyTitle level={5} text="Have a question?" />
          <TypographyText text="Contact the property for any questions or special requests." />
          <div className="flex items-center gap-1">
            <AiFillPhone size={20} />
            <TypographyText
              text={booking?.bookingRooms?.[0]?.room?.hotel?.phoneNumber}
            />
          </div>
          <div className="flex items-center gap-1">
            <MdEmail size={20} />
            <TypographyText
              text={booking?.bookingRooms?.[0]?.room?.hotel?.email}
            />
          </div>
        </div>
        <span className="w-[1px] h-full bg-border"></span>
        <div className="flex flex-col basis-[33%] p-4 gap-2">
          <div className="flex flex-col">
            <span>
              Confirmation number:{" "}
              <strong>{booking?.id.split("-")?.[0]}</strong>
            </span>
            <span>
              PIN code: <strong>{booking?.id.split("-")?.[2]}</strong>
            </span>
          </div>
          <Divider />
          <div className="flex flex-col">
            <span className="text-sm">Check-in:</span>
            <TypographyTitle
              level={5}
              text={dayjs(booking?.checkIn).format("dddd, MMMM D, YYYY")}
            />
            <span className="text-sm">from 2:00 PM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Check-out:</span>
            <TypographyTitle
              level={5}
              text={dayjs(booking?.checkOut).format("dddd, MMMM D, YYYY")}
            />
            <span className="text-sm">until 12:00 PM</span>
          </div>
          <Divider />
          <div className="flex flex-col">
            <span className="text-sm">Price</span>
            <TypographyTitle
              level={5}
              text={`${dayjs(booking?.checkOut)?.diff(
                dayjs(booking?.checkIn),
                "day"
              )} ${wordTransformByQuantity(
                "night",
                dayjs(booking?.checkOut)?.diff(dayjs(booking?.checkIn), "day")
              )}`}
            />
            <TypographyTitle
              level={3}
              text={`VND ${currencyFormatter(Number(booking?.totalAmount))}`}
              className="text-dollar"
            />
            <span className="text-sm text-gray-400">
              {"This price doesn't include taxes and fees."}
            </span>
          </div>
        </div>
        <span className="w-[1px] h-full bg-border"></span>
        <div className="flex flex-col basis-[33%] p-4 gap-3">
          <TypographyTitle level={4} text="Tips before you go" />
          <span className="text-sm">
            {
              "You picked a great place to stay for your trip! You'll get more privacy, more space and have a home away from home that's all yours. Well done! We want to make sure you know some things before you go. "
            }
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-bold">
              Traveling with kids or furry friends?
            </span>
            <span className="text-sm">
              All children are welcome. Check the{" "}
              <a
                className="underline"
                href="https://secure.booking.com/bookcancel.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaPQBiAEBmAEquAEHyAEP2AEB6AEB-AEMiAIBqAIDuALp2ZCkBsACAdICJDczNjdkZTIzLWRjNDUtNGVjMy05NDcxLTJmMmUxMTc1OTI4MNgCBuACAQ&sid=cddf7682784402354bb125e58567a718&hotel_id=1892185&policygroup_room=2023-06-13,189218516:350319896&bn=3484886972&general=350319896&checkin=2023-06-12&checkout=2023-06-13&persons=2&default_price_mode=1"
              >
                Children and extra beds policies
              </a>{" "}
              for details on where your little ones can sleep.
            </span>
          </div>
          <span className="text-sm">Pets are not allowed.</span>
          <span className="text-sm font-bold">
            If you still have questions or any urgent issues, your host would be
            happy to help. Feel free to contact them directly at{" "}
            {booking?.bookingRooms?.[0]?.room?.hotel?.phoneNumber} or through
            email <span>{booking?.bookingRooms?.[0]?.room?.hotel?.email}</span>.
          </span>
          <Button
            type="primary"
            className="bg-primary text-white hover:bg-primary/60"
            onClick={() => setCancelModalVisible(true)}
          >
            Cancel booking
          </Button>
        </div>
        <Modal
          open={cancelModalVisible}
          cancelText="Close"
          okText="Confirm cancel"
          onCancel={() => setCancelModalVisible(false)}
          onOk={handleCancelBooking}
        >
          <TypographyTitle
            level={4}
            text="Are you sure to cancel this booking?"
          />
        </Modal>
      </div>
      <Button
        type="primary"
        className="bg-base text-white hover:bg-base/80"
        onClick={() => {
          window.location.href = `/profile`
        }}
      >
        Go to profile
      </Button>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <Spin size="large" />
    </div>
  )
}

export default BookingHistoryDetail
