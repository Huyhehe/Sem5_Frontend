import { AppContext } from "@/App"
import AddressSelectorGroup from "@/components/common/AddressSelectorGroup"
import FormItem from "@/components/common/FormItem"
import InputField from "@/components/common/InputField"
import SelectorField from "@/components/common/SelectorField"
import useUser from "@/hooks/useUser"
import {
  getHotel,
  getHotelAmenities,
  getHotelStyles,
} from "@/service/api/hotel"
import { createLocationAPI } from "@/utils/http"
import { getAccessTokenFromLocal } from "@/utils/localStorage"
import { trimmedObject } from "@/utils/reusable"
import { Form, Input, Rate, message, notification } from "antd"
import { useContext, useEffect, useMemo, useState } from "react"
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom"
import { OutletContextType } from "./outletContext.type"
import { Location } from "@/interfaces/location"
import { getLocation } from "@/service/api/location"
import {
  GeneralInfoEditForm,
  GeneralInfoAddForm,
} from "./components/general-info"
import { Hotel } from "@/interfaces/hotel"

const GeneralInfo = () => {
  const { updateCurrentStep } = useOutletContext<OutletContextType>()
  const [queryString] = useSearchParams()
  const [defaultHotel, setDefaultHotel] = useState<Hotel>()
  const { setLoading, setCurrentRoute, openNotification } =
    useContext(AppContext)
  const currentLocation = useLocation()
  const navigator = useNavigate()

  useEffect(() => {
    updateCurrentStep(0)
  }, [])

  useEffect(() => {
    if (queryString.get("id")) {
      const fetchHotel = async () => {
        try {
          setLoading(true)
          const data = await getHotel(String(queryString.get("id")))
          setDefaultHotel(data)
          setLoading(false)
        } catch (error: any) {
          setLoading(false)
          message.error(error.message)
        }
      }
      fetchHotel()
    }
  }, [queryString])

  return (
    <div className="location-add w-full flex flex-col">
      {defaultHotel ? (
        <GeneralInfoEditForm
          updateCurrentStep={updateCurrentStep}
          defaultHotel={defaultHotel}
        />
      ) : (
        <GeneralInfoAddForm updateCurrentStep={updateCurrentStep} />
      )}
    </div>
  )
}

export default GeneralInfo
