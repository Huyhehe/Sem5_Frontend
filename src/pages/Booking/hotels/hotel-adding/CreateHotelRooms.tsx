import { useOutletContext, useSearchParams } from "react-router-dom"
import { OutletContextType } from "./outletContext.type"
import { useEffect, useState } from "react"
import { HotelRoomsResponse } from "@/types/responses/hotel"
import { getRoomsOfHotel } from "@/service/api/hotel/getRoomsOfHotel.api"
import { RoomCard } from "./components/create-rooms"
import { Button, Form, Modal } from "antd"
import { HotelRoom } from "@/interfaces/hotel"
import SelectorField from "@/components/common/SelectorField"

const CreateHotelRooms = () => {
  const [queryString] = useSearchParams()
  const { updateCurrentStep } = useOutletContext<OutletContextType>()
  const [pendingRooms, setPendingRooms] = useState<HotelRoomsResponse>([])
  const [editingRoom, setEditingRoom] = useState<HotelRoom>()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  useEffect(() => {
    updateCurrentStep(1)
  }, [])
  useEffect(() => {
    if (queryString.get("id")) {
      const fetchHotelRooms = async () => {
        try {
          const rooms = await getRoomsOfHotel(String(queryString.get("id")))
          setPendingRooms(rooms)
        } catch (error) {
          console.log(error)
        }
      }
      fetchHotelRooms()
    }
  }, [queryString.get("id")])

  return (
    <div>
      {pendingRooms.length < 0 ? null : (
        <>
          {pendingRooms.map((room) => {
            return <RoomCard room={room} key={room.id} />
          })}
        </>
      )}
      <div className="flex justify-end gap-2 mt-5">
        <Button
          onClick={() => {
            setEditingRoom(undefined)
            setIsOpenModal(true)
          }}
        >
          Add another room
        </Button>
        <Button type="primary" className="bg-secondary">
          Next step
        </Button>
      </div>
      <Modal
        open={isOpenModal}
        onCancel={() => {
          setEditingRoom(undefined)
          setIsOpenModal(false)
        }}
      >
        <form>
          <Form.Item>
            <SelectorField />
          </Form.Item>
        </form>
      </Modal>
    </div>
  )
}

export default CreateHotelRooms
