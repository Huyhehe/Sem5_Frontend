import TypographyText from "@/components/common/TypographyText"
import Spin from "antd/es/spin"
import Steps from "antd/es/steps"
import message from "antd/es/message"
import { Suspense, useEffect, useState } from "react"
import { Outlet, useNavigate, useSearchParams } from "react-router-dom"

const HotelAdding = () => {
  const navigator = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const updateCurrentStep = (newStep: number) => {
    setCurrentStep(newStep)
  }
  const [queryString] = useSearchParams()

  useEffect(() => {
    if (window.location.pathname === "/hotels/create-hotel") {
      navigator("/hotels/create-hotel/general-info")
    }
    if (
      !queryString.get("id") &&
      !window.location.pathname.includes("/hotels/create-hotel/general-info")
    ) {
      navigator("/hotels/create-hotel/general-info")
      message.warning("Please follow the steps to create a hotel")
    }
  }, [window.location.pathname])

  const nextStep = (destination: string) => {
    if (
      !queryString.get("id") &&
      !destination.includes("/hotels/create-hotel/general-info")
    ) {
      return message.warning("Please follow the steps to create a hotel")
    }
    navigator(destination)
  }

  return (
    <div className="w-full">
      <Steps
        className="w-full mb-8"
        current={currentStep}
        direction="horizontal"
        items={[
          {
            title: (
              <TypographyText
                text="Step 1"
                onClick={() =>
                  nextStep(
                    `/hotels/create-hotel/general-info?id=${queryString.get(
                      "id"
                    )}`
                  )
                }
                className="cursor-pointer hover:text-secondary"
              />
            ),
            description: "General information",
          },
          {
            title: (
              <TypographyText
                text="Step 2"
                onClick={() =>
                  nextStep(
                    `/hotels/create-hotel/create-rooms?id=${queryString.get(
                      "id"
                    )}`
                  )
                }
                className="cursor-pointer hover:text-secondary"
              />
            ),
            description: "Create rooms",
          },
          {
            title: "Step 3",
            description: "Images",
          },
          {
            title: "Step 4",
            description: "Payment method",
          },
        ]}
      />
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-full">
            <Spin size="small" />
          </div>
        }
      >
        <Outlet context={{ updateCurrentStep }} />
      </Suspense>
    </div>
  )
}

export default HotelAdding
