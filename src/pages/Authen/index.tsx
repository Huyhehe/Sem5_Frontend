import { FunctionComponent } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import "./styles.css"

interface AuthenPageProps {}

const AuthenPage: FunctionComponent<AuthenPageProps> = () => {
  const navigator = useNavigate()
  return (
    <div className="authen-container flex py-[2rem] px-[7rem]">
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
          <Outlet />
        </div>
      </div>
      <div className="authen-extraContent flex-grow-[3]"></div>
    </div>
  )
}

export default AuthenPage
