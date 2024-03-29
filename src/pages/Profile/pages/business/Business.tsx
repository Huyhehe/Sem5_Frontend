import Button from "antd/es/button"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { ProfileOutletContextType } from "../../profileOutletContext.type"
import { PrivateHotel, getPrivateHotels } from "@/service/api/hotel"
import { inProgressHotel } from "@/assets/images"
import TypographyTitle from "@/components/common/TypographyTitle"
import TypographyText from "@/components/common/TypographyText"
import { LocationTypo } from "@/components/common/LocationTypo"
import ProgressBar from "@/components/common/ProgressBar"
import Modal from "antd/es/modal"
import Badge from "antd/es/badge"
import { removeHotel } from "@/service/api/hotel/removeHotel.api"
import { AppContext } from "@/App"

const Business = () => {
  const { setLoading } = useContext(AppContext)
  const { userInfo } = useOutletContext<ProfileOutletContextType>()
  const [hotels, setHotels] = useState<PrivateHotel[]>([])
  const navigator = useNavigate()
  const [confirmRemoveModal, setConfirmRemoveModal] = useState(false)

  const fetchPrivateHotels = async () => {
    try {
      const data = await getPrivateHotels()
      setHotels(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveHotel = async (hotelId: string) => {
    try {
      setLoading(true)
      await removeHotel(hotelId)
      setLoading(false)
      fetchPrivateHotels()
      setConfirmRemoveModal(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    if (userInfo) {
      fetchPrivateHotels()
    }
  }, [])

  return (
    <>
      {hotels ? (
        <>
          <Button
            className="mb-4 border-base text-base hover:bg-base hover:text-white"
            onClick={() => {
              navigator("/hotels/create-hotel/general-info")
            }}
          >
            Create new hotel
          </Button>
          {hotels.map((hotel) => {
            return hotel.isRegistered ? (
              <Badge.Ribbon key={hotel.id} color="green" text="Published">
                <div className="min-h-[7rem] flex mb-3 shadow-custom rounded-md overflow-hidden">
                  <img src={inProgressHotel} className="h-full w-[15rem]" />
                  <div className="p-4 grow">
                    <TypographyTitle level={3} text={hotel?.location?.name} />
                    {hotel?.location?.address && (
                      <LocationTypo
                        country={hotel?.location?.address?.country?.name}
                        province={hotel?.location?.address?.province?.name}
                        district={hotel?.location?.address?.district?.name}
                        ward={hotel?.location?.address?.ward?.name}
                        streetAddress={hotel?.location?.address?.streetAddress}
                        prefix={null}
                        extendClassName="text-[0.75rem]"
                      />
                    )}
                    {hotel?.statusRegisterProgress < 1 && (
                      <ProgressBar
                        percent={hotel?.statusRegisterProgress * 100}
                        showInfo={false}
                        description={
                          <TypographyText
                            text={`Register progress - ${
                              hotel?.statusRegisterProgress * 100
                            }% done`}
                            className="font-bold w-full"
                          />
                        }
                        className="m-0 w-1/2"
                      />
                    )}
                    <div className="flex gap-2">
                      <Button
                        type="primary"
                        className="mt-4 bg-base hover:bg-secondary"
                        onClick={() => {
                          if (hotel?.statusRegisterProgress) {
                            switch (hotel?.statusRegisterProgress) {
                              case 0.25: {
                                navigator(
                                  `/hotels/create-hotel/create-rooms?id=${hotel.id}`
                                )
                                break
                              }
                              case 0.5: {
                                navigator(
                                  `/hotels/create-hotel/images?id=${hotel.id}`
                                )
                                break
                              }
                              case 0.75: {
                                navigator(
                                  `/hotels/create-hotel/confirm?id=${hotel.id}`
                                )
                                break
                              }
                              default: {
                                navigator(
                                  `/hotels/create-hotel/general-info?id=${hotel.id}`
                                )
                                break
                              }
                            }
                          }
                        }}
                      >
                        {hotel?.statusRegisterProgress < 1
                          ? "Continue"
                          : "Update"}
                      </Button>
                      <Button
                        type="primary"
                        className="mt-4 bg-primary hover:bg-primary/80"
                        onClick={() => {
                          setConfirmRemoveModal(true)
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                <Modal
                  open={confirmRemoveModal}
                  okText="Remove"
                  onCancel={() => {
                    setConfirmRemoveModal(false)
                  }}
                  onOk={() => {
                    handleRemoveHotel(hotel?.id)
                  }}
                >
                  Are you sure you want to remove this hotel?
                </Modal>
              </Badge.Ribbon>
            ) : (
              <div className="min-h-[7rem] flex mb-3 shadow-custom rounded-md overflow-hidden">
                <img src={inProgressHotel} className="h-full w-[15rem]" />
                <div className="p-4 grow">
                  <TypographyTitle level={3} text={hotel?.location?.name} />
                  {hotel?.location?.address && (
                    <LocationTypo
                      country={hotel?.location?.address?.country?.name}
                      province={hotel?.location?.address?.province?.name}
                      district={hotel?.location?.address?.district?.name}
                      ward={hotel?.location?.address?.ward?.name}
                      streetAddress={hotel?.location?.address?.streetAddress}
                      prefix={null}
                      extendClassName="text-[0.75rem]"
                    />
                  )}
                  {hotel?.statusRegisterProgress < 1 && (
                    <ProgressBar
                      percent={hotel?.statusRegisterProgress * 100}
                      showInfo={false}
                      description={
                        <TypographyText
                          text={`Register progress - ${
                            hotel?.statusRegisterProgress * 100
                          }% done`}
                          className="font-bold w-full"
                        />
                      }
                      className="m-0 w-1/2"
                    />
                  )}
                  <div className="flex gap-2">
                    <Button
                      type="primary"
                      className="mt-4 bg-base hover:bg-secondary"
                      onClick={() => {
                        if (hotel?.statusRegisterProgress) {
                          switch (hotel?.statusRegisterProgress) {
                            case 0.25: {
                              navigator(
                                `/hotels/create-hotel/create-rooms?id=${hotel.id}`
                              )
                              break
                            }
                            case 0.5: {
                              navigator(
                                `/hotels/create-hotel/images?id=${hotel.id}`
                              )
                              break
                            }
                            case 0.75: {
                              navigator(
                                `/hotels/create-hotel/confirm?id=${hotel.id}`
                              )
                              break
                            }
                            default: {
                              navigator(
                                `/hotels/create-hotel/general-info?id=${hotel.id}`
                              )
                              break
                            }
                          }
                        }
                      }}
                    >
                      {hotel?.statusRegisterProgress < 1
                        ? "Continue"
                        : "Update"}
                    </Button>
                    <Button
                      type="primary"
                      className="mt-4 bg-primary hover:bg-primary/80"
                      onClick={() => {
                        setConfirmRemoveModal(true)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <Modal
                  open={confirmRemoveModal}
                  okText="Remove"
                  onCancel={() => {
                    setConfirmRemoveModal(false)
                  }}
                  onOk={() => {
                    handleRemoveHotel(hotel?.id)
                  }}
                >
                  Are you sure you want to remove this hotel?
                </Modal>
              </div>
            )
          })}
        </>
      ) : (
        <div className="flex flex-col p-4 gap-2 shadow-custom rounded-md">
          <h1 className="text-center text-xl font-bold">
            Let&apos;s start your first business!
          </h1>
          <p className="text-center text-sm m-auto">
            Start publishing your very first hotel! Easier marketing with us
            <br />
            <Button
              type="primary"
              className="mt-4 bg-[#1890ff] hover:bg-[#69c0ff]"
              onClick={() => {
                navigator("/hotels/create-hotel/general-info")
              }}
            >
              Start now
            </Button>
          </p>
        </div>
      )}
    </>
  )
}

export default Business
