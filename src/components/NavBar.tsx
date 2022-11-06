import { Button, Space } from "antd"
import { FunctionComponent } from "react"
import { NavLink, useNavigate } from "react-router-dom"

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  const navigator = useNavigate()
  const navItems = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Contact",
      link: "/contact",
    },
    {
      title: "Search",
      link: "/search",
    },
  ]
  const activeClassName =
    "relative self-stretch flex items-center text-[1.5rem] text-primary font-bold cursor-pointer hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary"
  const unActiveClassName =
    "relative self-stretch flex items-center text-[1.5rem] font-bold cursor-pointer hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:transition-all after:duration-300 after:transform after:scale-x-0 hover:after:scale-x-100"

  return (
    <div className="h-[3.5rem] px-[10%] flex justify-center gap-[20rem] items-center border-b">
      <div className="logo-container text-[1.5rem]">
        <h1 className="text-blue-500">
          TRAVEL<strong className="text-primary">CARE</strong>
        </h1>
      </div>
      <div className="links-container h-full flex gap-4 justify-center">
        {navItems.map((item, index) => {
          return (
            <NavLink
              key={index}
              end
              className={({ isActive }: any) =>
                isActive ? activeClassName : unActiveClassName
              }
              to={item.link}
            >
              {item.title}
            </NavLink>
          )
        })}
      </div>
      <div className="log-button-container">
        <Space align="center">
          <Button
            className="h-[2.5rem] rounded-lg text-white bg-blue-500 border-none hover:bg-blue-500/70"
            onClick={() => navigator("/login/signIn")}
          >
            Sign in
          </Button>
          <Button
            className="h-[2.5rem] rounded-lg text-white bg-primary border-none hover:bg-primary/70"
            onClick={() => navigator("/login/signUp")}
          >
            Sign up for free!
          </Button>
        </Space>
      </div>
    </div>
  )
}

export default NavBar
