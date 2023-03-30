import { AppContext } from "@/App"
import { publicAPI } from "@/utils/constant"
import { getProvinces } from "@/utils/http"
import { useContext, useEffect, useState } from "react"

const useProvinces = () => {
  const { openNotification } = useContext(AppContext)
  const [provinces, setProvinces] = useState(null)
  const fetchProvince = async () => {
    try {
      const res = await getProvinces(publicAPI.provinces)
      setProvinces(res)
    } catch (error) {
      openNotification("error", {
        message: "Error",
        description: `Something went wrong, it might be ${error}`,
      })
    }
  }

  useEffect(() => {
    fetchProvince()
  }, [])

  return provinces
}

export default useProvinces
