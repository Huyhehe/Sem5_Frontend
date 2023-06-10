import TypographyText from "@/components/common/TypographyText"
import TypographyTitle from "@/components/common/TypographyTitle"
import useUser from "@/hooks/useUser"
import { Hotel, HotelRoom } from "@/interfaces/hotel"
import { getHotel, getRoom } from "@/service/api/hotel"
import { currencyFormatter, wordTransformByQuantity } from "@/utils/reusable"
import { Divider, Form, Input, Spin, message } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { useEffect, useState } from "react"
import { TiWarning } from "react-icons/ti"
import { useNavigate, useSearchParams } from "react-router-dom"
import CheckoutHotelCard from "../components/CheckoutHotelCard"
import CheckoutRoomCard from "../components/CheckoutRoomCard"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { Tb24Hours } from "react-icons/tb"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { captureOrder, requestCreateOrder } from "@/service/api/paypal"
import { PAYPAL_CLIENT } from "@/utils/constant"

interface DayRange {
  startDate: Dayjs
  endDate: Dayjs
  today: Dayjs
}

const Payment = () => {
  const userInfo = useUser()
  const [queryString] = useSearchParams()
  const navigator = useNavigate()
  const [hotel, setHotel] = useState<Hotel>()
  const [room, setRoom] = useState<HotelRoom>()
  const [dates] = useState<DayRange>({
    startDate: dayjs(queryString.get("startDate")),
    endDate: dayjs(queryString.get("endDate")),
    today: dayjs().startOf("day"),
  })
  const { startDate, endDate, today } = dates

  const fetchHotel = async () => {
    try {
      const hotel = await getHotel(String(queryString.get("hotelId")))
      setHotel(hotel)
    } catch (error: any) {
      message.error(error.message)
    }
  }

  const fetchRoom = async () => {
    try {
      const room = await getRoom(String(queryString.get("roomId")))
      setRoom(room)
    } catch (error: any) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    if (!queryString.get("hotelId") && !queryString.get("roomId")) {
      window.location.href = "/profile/my-bookings"
    } else {
      Promise.all([fetchHotel(), fetchRoom()])
    }
  }, [queryString])

  return hotel && room ? (
    <div className="flex gap-3 min-h-screen w-full">
      <div className="basis-1/3 flex flex-col gap-4">
        <div className="w-full flex flex-col p-4 gap-2 rounded-lg border">
          <TypographyTitle level={5} text="Room booking details" />
          <div className="flex">
            <div className="flex flex-col basis-[48%]">
              <TypographyText text="Check-in" />
              <TypographyTitle
                level={5}
                text={startDate.format("ddd, D MMMM YYYY")}
              />
              <TypographyText text="From 13:00" />
            </div>
            <Divider type="vertical" className="h-full" />
            <div className="flex flex-col basis-[48%]">
              <TypographyText text="Check-in" />
              <TypographyTitle
                level={5}
                text={endDate.format("ddd, D MMMM YYYY")}
              />
              <TypographyText text="To 12:00" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-gold">
            <TiWarning size={20} />
            <span className="text-sm">
              {startDate.diff(today, "day") > 0
                ? `Just ${startDate.diff(today, "day")} day away!`
                : "Today!"}
            </span>
          </div>
          <TypographyText text="Total stay days:" />
          <strong>
            <TypographyText
              text={`${endDate.diff(
                startDate,
                "day"
              )} ${wordTransformByQuantity(
                "night",
                endDate.diff(startDate, "day")
              )}`}
            />
          </strong>
          <Divider className="w-full m-0" />
          <TypographyText text="You chose" />
          <TypographyTitle
            level={5}
            text={`${queryString.get("room")} room for ${queryString.get(
              "person"
            )} ${wordTransformByQuantity(
              "person",
              Number(queryString.get("person"))
            )}`}
          />
        </div>
        <div className="w-full flex flex-col p-4 gap-2 rounded-lg border">
          <TypographyTitle level={5} text="Price summary" />
          <div className="flex justify-between">
            <TypographyText text="Original price" />
            <TypographyText
              text={`VND ${currencyFormatter(room?.price || 0)}`}
            />
          </div>
          <div className="flex justify-between">
            <TypographyText text="Discount" />
            <TypographyText text={`- VND ${currencyFormatter(0)}`} />
          </div>
          <Divider className="w-full m-0" />
          <div className="flex justify-between">
            <TypographyTitle level={3} text="Price" className="font-bold" />
            <div className="flex flex-col items-end">
              <TypographyTitle
                level={3}
                text={`VND ${currencyFormatter(room?.price || 0)}`}
              />
              <TypographyText
                text={`+VND ${currencyFormatter((room?.price || 0) * 0.1)}`}
                className="text-grey-300"
              />
            </div>
          </div>
          <Divider className="w-full m-0" />
          <div>
            <TypographyTitle level={5} text="Price details" />
            <TypographyText
              text={`Excludes VND ${currencyFormatter(
                (room.price || 0) * 0.1
              )} taxes`}
            />
            <div className="flex justify-between">
              <TypographyText text="10% VAT" />
              <TypographyText
                text={`VND ${currencyFormatter((room.price || 0) * 0.1)}`}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col p-4 gap-2 rounded-lg border">
          <TypographyTitle level={5} text="Payment schedule" />
          <span className="text-[0.85rem] text-dollar">
            {"No payment today. You'll pay when you stay."}
          </span>
        </div>
        <div className="w-full flex flex-col p-4 gap-2 rounded-lg border">
          <TypographyTitle level={5} text="How much will it cost to cancel?" />
          {room?.isFreeCancellation && (
            <span className="text-[0.85rem] text-dollar">
              {`Free cancellation anytime before 13:00 ${startDate.format(
                "ddd, D MMMM YYYY"
              )}`}
            </span>
          )}
        </div>
        <div>
          <PayPalScriptProvider
            options={{
              "client-id": String(PAYPAL_CLIENT),
            }}
          >
            <PayPalButtons
              className="w-full"
              createOrder={() => {
                return requestCreateOrder({
                  rooms: [
                    {
                      roomId: room?.id,
                      numberOfRooms: Number(queryString.get("room")),
                    },
                  ],
                  checkIn: startDate.add(7, "hours").toISOString(),
                  checkOut: endDate.add(7, "hours").toISOString(),
                  customerName:
                    `${userInfo?.firstName} ${userInfo?.lastName}` || "",
                }).then((res) => res.id)
              }}
              onApprove={(data) => {
                return captureOrder(data.orderID)
                  .then((res) => {
                    message.success("Payment success!")
                    navigator("/profile/my-bookings")
                  })
                  .catch((err) => {
                    message.error("Payment failed!")
                  })
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
      <div className="basis-2/3 flex flex-col gap-4">
        <CheckoutHotelCard hotel={hotel} />
        {userInfo && (
          <div className="flex gap-2 p-4 rounded-lg border items-center">
            <img
              src={userInfo?.profileImageUrl}
              alt="avatar"
              className="rounded-full w-14 aspect-square"
            />
            <div className="flex flex-col">
              <TypographyTitle
                level={5}
                text="You are signed in"
                className="m-0"
              />
              <TypographyText text={userInfo?.email} />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 p-4 rounded-lg border">
          <TypographyTitle level={4} text="Your contact details" />
          <Form
            initialValues={{
              firstName: userInfo?.firstName,
              lastName: userInfo?.lastName,
              email: userInfo?.email,
            }}
            className="w-[70%]"
          >
            <div className="flex gap-4">
              <Form.Item
                label="First name"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Last name"
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </div>{" "}
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              labelCol={{ span: 24 }}
            >
              <Input disabled />
            </Form.Item>
            <TypographyText text="We'll send your confirmation to this email address." />
          </Form>
        </div>
        <CheckoutRoomCard room={room} hotel={hotel} />
        <div className="flex flex-col gap-2 p-4 rounded-lg border">
          <TypographyTitle level={4} text="Your arrival time" />
          <div className="flex items-center gap-2">
            <AiOutlineCheckCircle size={20} className="text-dollar" />
            <TypographyText text="Your room will be ready for check-in at 2:00 PM" />
          </div>
          <div className="flex items-center gap-2">
            <Tb24Hours size={20} className="text-dollar" />
            <TypographyText text="24-hour front desk - help whenever you need it!" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <Spin size="large" />
    </div>
  )
}

export default Payment
