import { FunctionComponent, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { coverX2 } from "../../assets/images/index"
import "./styles.css"

interface AuthenPageProps {}

const AuthenPage: FunctionComponent<AuthenPageProps> = () => {
  const navigator = useNavigate()
  const [email, setEmail] = useState<string | null>(null)

  return (
    <div className="authen-container flex 2xl:py-[2rem] py-[1rem] px-[7rem]">
      <div className="authen-main flex flex-col flex-grow gap-[2rem]">
        <div
          onClick={() => navigator("/")}
          className="main-logo text-[4rem] cursor-pointer"
        >
          <h1 className="text-blue-500 leading-[4rem]">
            TRAVEL<strong className="text-primary">CARE</strong>
          </h1>
        </div>
        <div className="main-form">
          <Outlet context={{ email, setEmail }} />
        </div>
      </div>
      <div className="authen-extraContent flex-grow-[3] flex justify-end">
        <img src={coverX2} />
      </div>
    </div>
  )
}

export default AuthenPage
