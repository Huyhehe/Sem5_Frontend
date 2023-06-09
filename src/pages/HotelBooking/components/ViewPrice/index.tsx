import { DateRagePicker } from '@/components/common/DateRagePicker'
import GuessQuantity from '@/components/common/GuessQuantity'
import HotelFilterDropdown from '@/pages/Booking/components/Header/components/HotelFilterDropdown'
import { getVndPrice } from '@/pages/Booking/components/Header/utils/helpers.utils'
import { IRoom } from '@/types/responses/hotel/hotelBooking.res.type'
import { RangePickerTypes } from '@/utils/enum'
import type { Dayjs as DayjsType } from "dayjs"
import Dayjs from "dayjs"
import { useFormik } from 'formik'
import { useState, useContext } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { HotelBookingContext } from '../..'
interface IViewPriceProps {
    rooms: IRoom[]
}
interface IPriceDetailProps {
    room: IRoom
    startDate: DayjsType
    endDate: DayjsType
    roomNumber: number
    personNumber: number
}
function ViewPrice({ rooms }: IViewPriceProps) {

    const navigator = useNavigate()
    const [searchParams] = useSearchParams()

    const { start, end, room, person } = Object.fromEntries(
        searchParams.entries()
    )

    const [isShowMore, setIsShowMore] = useState(false)
    const [startDate, setStartDate] = useState<DayjsType>(Dayjs(start))
    const [endDate, setEndDate] = useState<DayjsType>(
        end ? Dayjs(end) : Dayjs(start).add(1, "day")
    )
    const [rangePickerType, setRangePickerType] = useState<RangePickerTypes>()

    const { setFieldValue, handleSubmit, values } = useFormik({
        initialValues: {
            room: room || 1,
            person: person || 2,
            dayRange: [startDate, endDate],
            location: location || "",
        },
        onSubmit: (values) => {
            navigator(
                `/hotel-booking?location=${values.location}&start=${values.dayRange[0].format(
                    "YYYY-MM-DD"
                )}&end=${values.dayRange[1].format("YYYY-MM-DD")}&room=${values.room
                }&person=${values.person}`
            )
        },
    })

    const onToggleViewAllDeal = () => {
        setIsShowMore(prev => !prev)
    }

    return (
        <div className='py-6 px-8 border border-[#ccc]/30 rounded-md shadow-sm'>
            <h1 className='text-xl font-medium'>View prices for your travel dates</h1>
            <div className='mt-8 grid grid-cols-10 gap-x-3'>
                <div className='col-span-7'>
                    <DateRagePicker
                        name="dayRange"
                        size="large"
                        className="w-full h-[3rem] cursor-pointer border-[2px] hover:border-black"
                        inputReadOnly
                        allowClear={false}
                        disabledDate={(date) => {
                            if (rangePickerType === RangePickerTypes.START) {
                                return date.isBefore(new Date(), "day")
                            } else if (rangePickerType === RangePickerTypes.END) {
                                if (startDate) {
                                    return date.isBefore(new Date())
                                }
                            }
                            return date.isBefore(new Date(), "day")
                        }}
                        onCalendarChange={(dates, _, info) => {
                            if (info.range === "start") {
                                setStartDate(Dayjs(dates?.[0]))
                                setFieldValue("dayRange", [Dayjs(dates?.[0]), endDate])
                            }
                            if (info.range === "end") {
                                setEndDate(Dayjs(dates?.[1]))
                                setFieldValue("dayRange", [startDate, Dayjs(dates?.[1])])
                            }
                            handleSubmit()
                        }}
                        onFocus={(e) => {
                            setRangePickerType(e.target.placeholder as RangePickerTypes)
                        }}
                        value={[startDate, endDate]}
                    />
                </div>
                <div className='col-span-3'>
                    <HotelFilterDropdown
                        room={Number(room)}
                        person={Number(person)}
                        onUpdate={(value) => {
                            setFieldValue("room", value.room)
                            setFieldValue("person", value.person)
                            handleSubmit()
                        }}
                    />
                </div>
            </div>

            <div className='mt-4'>
                {rooms && rooms?.map((item, index: number) => {
                    if (index > 1 && !isShowMore) return <></>
                    return <PriceDetail
                        key={index}
                        room={item}
                        startDate={startDate}
                        endDate={endDate}
                        roomNumber={Number(values?.room)}
                        personNumber={Number(values?.person)}
                    />
                }
                )}
            </div>

            <div className='mt-6'>
                <div className='w-fit flex items-center gap-x-1' onClick={onToggleViewAllDeal}>
                    <button className='font-medium underline'> {isShowMore && rooms?.length > 2 ? "Collapse deals" : "View all deals"}</button>
                    {isShowMore && rooms?.length > 2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <p className='mt-6 text-sm tracking-wider'>Prices are the average nightly price provided by our partners and may not include all taxes and fees. Taxes and fees that are shown are estimates only. Please see our partners for more details.</p>
            </div>
        </div>
    )
}

const PriceDetail = ({ room, startDate, endDate, roomNumber, personNumber }: IPriceDetailProps) => {
    const context = useContext(HotelBookingContext)

    return <div className='py-4 border-t border-[#ccc]/30'>
        <div className='grid grid-cols-10'>
            <div className='col-span-2'>
                <span className='font-medium'>Room available:</span>
                <span className='ml-1'>{room?.availableRooms}</span>
            </div>
            <div className='col-span-4 flex flex-col gap-y-2 items-center justify-center'>
                <GuessQuantity quantity={room?.sleeps} />
            </div>
            <div className='col-span-2'>
                <span className='text-black text-2xl font-medium flex items-center justify-center'>{getVndPrice(room?.price)}</span>
            </div>
            <div className='col-span-2 flex items-center justify-end'>
                <button className='bg-[#f2b203] rounded-[100px] font-medium px-6 py-3 hover:bg-[#f2b203]/60'
                    onClick={() => context?.onViewDetailDeal(room?.id, startDate, endDate, roomNumber, personNumber)}
                >
                    View deal
                </button>
            </div>
        </div>
    </div>
}

export default ViewPrice