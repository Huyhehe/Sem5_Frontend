import SelectorField from "@/components/common/SelectorField"
import TypographyTitle from "@/components/common/TypographyTitle"
import { HotelRoom } from "@/interfaces/hotel"
import {
  createHotelRoomAPI,
  deleteHotelRoomAPI,
  getBedTypes,
  getRoomFeatures,
  getRoomTypes,
  removeRoomImages,
  updateHotelRoomAPI,
  uploadRoomImages,
} from "@/service/api/hotel"
import { getRoomsOfHotel } from "@/service/api/hotel/getRoomsOfHotel.api"
import { HotelRoomsResponse } from "@/types/responses/hotel"
import { Button, Divider, Form, InputNumber, Modal, Radio, message } from "antd"
import { useEffect, useState } from "react"
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom"
import "../../styles/CreateHotelRoom.css"
import { RoomCard } from "./components/create-rooms"
import { OutletContextType } from "./outletContext.type"
import { AiFillPlusCircle } from "react-icons/ai"
import { MdOutlineRemoveCircle } from "react-icons/md"
import { HotelRoomsRequest } from "@/types/requests"
import { currencyFormatter, currencyParser } from "@/utils/reusable"
import { freeCancellationPeriodOptions } from "../../utils"
import ImageUploadContainer from "@/components/common/ImageUploadContainer"
import TypographyText from "@/components/common/TypographyText"

const CreateHotelRooms = () => {
  const [queryString] = useSearchParams()
  const navigator = useNavigate()
  const { updateCurrentStep } = useOutletContext<OutletContextType>()
  const [pendingRooms, setPendingRooms] = useState<HotelRoomsResponse>([])
  const [editingRoom, setEditingRoom] = useState<HotelRoom>()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isFreeCancellation, setIsFreeCancellation] = useState(false)
  const [form] = Form.useForm<HotelRoomsRequest>()

  const fetchHotelRooms = async () => {
    try {
      const rooms = await getRoomsOfHotel(String(queryString.get("id")))
      setPendingRooms(rooms)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    updateCurrentStep(1)
    handleResetField()
  }, [])
  useEffect(() => {
    if (queryString.get("id")) {
      fetchHotelRooms()
    }
  }, [queryString.get("id")])

  const handleResetField = (room?: HotelRoom) => {
    form.setFieldsValue({
      roomTypeIds: room?.roomTypes?.[0]?.id ? [room?.roomTypes?.[0]?.id] : [],
      numberOfRooms: room?.numberOfRooms || 1,
      sleeps: room?.sleeps || 2,
      availableRooms: room?.numberOfRooms || 1,
      price: room?.price || 0,
      isPrepay: room?.isPrepay || false,
      isFreeCancellation: room?.isFreeCancellation || false,
      freeCancellationPeriod: room?.freeCancellationPeriod || 1,
      roomFeatureIds: room?.roomFeatures?.map((feature) => feature.id) || [],
      roomBeds: room?.roomBeds?.map((roomBed) => ({
        bedId: roomBed.bed.id,
        numberOfBed: roomBed.numberOfBeds,
      })) || [
        {
          bedId: undefined,
          numberOfBed: 1,
        },
      ],
    })
  }

  const handleEditRoom = async (room: HotelRoomsRequest, roomId: string) => {
    try {
      await updateHotelRoomAPI(room, roomId)
      message.success("Update room successfully")
    } catch (error) {
      message.error(`Something went wrong ${error}`)
    }
  }

  const handleAddRoom = async (room: HotelRoomsRequest, hotelId: string) => {
    try {
      await createHotelRoomAPI(room, hotelId)
      message.success("Add room successfully")
    } catch (error) {
      message.error(`Something went wrong ${error}`)
    }
  }

  const handleSubmit = async (value: HotelRoomsRequest) => {
    const room = {
      ...value,
      availableRooms: value.numberOfRooms,
      ...(value.isFreeCancellation
        ? { freeCancellationPeriod: value.freeCancellationPeriod }
        : { freeCancellationPeriod: null }),
    }
    editingRoom
      ? await handleEditRoom(room, editingRoom.id)
      : await handleAddRoom(room, String(queryString.get("id")))
    setIsOpenModal(false)
    fetchHotelRooms()
  }

  const handleUploadImage = async (images: any[]) => {
    try {
      const updatedData = await uploadRoomImages(
        String(editingRoom?.id),
        images
      )
      setEditingRoom((prev: any) => {
        return {
          ...prev,
          roomImages: updatedData.roomImages,
        }
      })
      message.success("Upload image successfully")
      fetchHotelRooms()
    } catch (error: any) {
      message.error(`Something went wrong ${error.message}`)
      throw new Error(error.message)
    }
  }

  const handleRemoveImage = async (imageId: string) => {
    try {
      const updatedData = await removeRoomImages(
        String(editingRoom?.id),
        imageId
      )
      setEditingRoom((prev: any) => {
        return {
          ...prev,
          roomImages: updatedData.roomImages,
        }
      })
      message.success("Remove image successfully")
      fetchHotelRooms()
    } catch (error: any) {
      message.error(`Something went wrong ${error.message}`)
      throw new Error(error.message)
    }
  }

  return (
    <div>
      {pendingRooms.length < 1 ? (
        <div className="flex flex-col items-center gap-2">
          <TypographyText text="Add rooms is required" />
          <Button
            onClick={() => {
              setEditingRoom(undefined)
              setIsOpenModal(true)
            }}
          >
            Add room
          </Button>
        </div>
      ) : (
        <>
          {pendingRooms.map((room) => {
            return (
              <RoomCard
                room={room}
                key={room.id}
                onEdit={() => {
                  handleResetField(room)
                  setEditingRoom(room)
                  setIsFreeCancellation(room.isFreeCancellation)
                  setIsOpenModal(true)
                }}
                onDelete={async () => {
                  try {
                    await deleteHotelRoomAPI(room.id)
                    fetchHotelRooms()
                    message.success("Delete room successfully")
                  } catch (error) {
                    message.error(`Something went wrong ${error}`)
                  }
                }}
                className="mb-5"
              />
            )
          })}
          <div className="flex justify-end gap-2 mt-5">
            <Button
              onClick={() => {
                setEditingRoom(undefined)
                setIsFreeCancellation(true)
                setIsOpenModal(true)
              }}
            >
              Add another room
            </Button>
            <Button
              type="primary"
              className="bg-secondary"
              onClick={() => {
                if (pendingRooms.length === 0) {
                  message.error("Please add at least one room")
                  return
                }
                navigator(
                  `/hotels/create-hotel/images?id=${queryString.get("id")}`
                )
              }}
            >
              Next step
            </Button>
          </div>
        </>
      )}
      <Modal
        okText={editingRoom ? "Save changes" : "Add room"}
        open={isOpenModal}
        onCancel={() => {
          handleResetField()
          setEditingRoom(undefined)
          setIsFreeCancellation(true)
          setIsOpenModal(false)
        }}
        onOk={() => {
          form.submit()
          setIsFreeCancellation(true)
        }}
        className="min-w-[50rem]"
      >
        <div className="p-4">
          <TypographyTitle
            level={4}
            text={editingRoom ? "EDIT ROOM" : "ADD ROOM"}
            className="font-bold mb-2"
          />
          <Form form={form} onFinish={handleSubmit}>
            {/* name roomTypeIds but actually it is roomTypeId (API doesn't support to change room types to room type) */}
            <Form.Item
              name={"roomTypeIds"}
              label="Room type"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Please select room type" }]}
            >
              <SelectorField
                fetchOptions={getRoomTypes}
                placeholder="Please select room type"
              />
            </Form.Item>
            <div className="w-full flex justify-between">
              <Form.Item
                name={"numberOfRooms"}
                label="How many room?"
                className=" basis-[30%]"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter number of rooms",
                  },
                ]}
                required
              >
                <InputNumber placeholder="3 rooms?" className="w-full" />
              </Form.Item>
              <Form.Item
                name={"sleeps"}
                label="Room size"
                className=" basis-[30%]"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter how many people can sleep in room",
                  },
                ]}
                required
              >
                <InputNumber placeholder="2 adults?" className="w-full" />
              </Form.Item>
              <Form.Item
                name={"price"}
                label="Price/Night"
                className=" basis-[30%]"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter price per night",
                  },
                ]}
                required
              >
                <InputNumber
                  placeholder="Price per night"
                  addonBefore="VND"
                  className="w-full"
                  min={0}
                  formatter={(value) => currencyFormatter(value || 0)}
                  parser={currencyParser}
                />
              </Form.Item>
            </div>
            <Form.Item name={"isPrepay"} initialValue={true}>
              <Radio.Group>
                <Radio value={true}>Pay before check-in</Radio>
                <Radio value={false}>Pay later</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name={"isFreeCancellation"} initialValue={true}>
              <Radio.Group
                onChange={(e) => {
                  setIsFreeCancellation(e.target.value)
                }}
              >
                <Radio value={true}>Free cancel</Radio>
                <Radio value={false}>Cancel with fee {"(100%)"}</Radio>
              </Radio.Group>
            </Form.Item>
            {isFreeCancellation && (
              <Form.Item name={"freeCancellationPeriod"}>
                <SelectorField
                  placeholder="
              Select free cancellation period"
                  options={freeCancellationPeriodOptions}
                />
              </Form.Item>
            )}
            <Form.Item
              name={"roomFeatureIds"}
              label="Guess love conveniences, let's meet their needs"
              labelCol={{ span: 24 }}
            >
              <SelectorField
                placeholder="Select features"
                fetchOptions={getRoomFeatures}
                mode="multiple"
              />
            </Form.Item>
            <Divider />
            <Form.List
              name="roomBeds"
              rules={[
                {
                  validator: async (_, roomBeds) => {
                    if (!roomBeds || roomBeds.length < 1) {
                      message.error("Please add at least 1 bed")
                      return Promise.reject(new Error("At least 1 bed"))
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  <div>
                    {fields.map((field, index) => (
                      <div key={field.key}>
                        <TypographyTitle level={5} text={`Bed ${index + 1}`} />
                        <Form.Item
                          label="Bed type"
                          name={[field.name, "bedId"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select bed type",
                            },
                          ]}
                          key={`${field.key}-bedID`}
                        >
                          <SelectorField
                            fetchOptions={getBedTypes}
                            placeholder="Select bed type"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Number of bed"
                          name={[field.name, "numberOfBed"]}
                          rules={[
                            {
                              required: true,
                              message: "Please input number of bed",
                            },
                          ]}
                          key={`${field.key}-numberOfBed`}
                        >
                          <InputNumber
                            placeholder="Enter number of bed"
                            min={1}
                            max={6}
                          />
                        </Form.Item>
                        <Button
                          onClick={() => remove(field.name)}
                          className="flex items-center gap-1 mt-2 px-1 text-5"
                          danger
                        >
                          <MdOutlineRemoveCircle size={20} /> Remove bed
                        </Button>
                        <Divider />
                      </div>
                    ))}
                  </div>
                  <Form.Item>
                    <Button
                      onClick={() => add()}
                      className="flex items-center gap-1 mt-2 px-1 text-5"
                    >
                      <AiFillPlusCircle size={20} /> Add new bed
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
          {editingRoom?.id && (
            <ImageUploadContainer
              currentImages={editingRoom?.roomImages}
              upload={handleUploadImage}
              removeImage={handleRemoveImage}
              submitText="Upload"
            />
          )}
        </div>
      </Modal>
    </div>
  )
}

export default CreateHotelRooms
