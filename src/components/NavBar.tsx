import { Button, Space } from "antd"
import { useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { NavLink, useNavigate } from "react-router-dom"
import ResizedNavlinks from "./ResizedNavlinks"

const navItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Search",
    link: "/search",
  },
  {
    title: "Review",
    link: "/review",
  },
  {
    title: "About",
    link: "/about",
  },
]

const NavBar = () => {
  const navigator = useNavigate()
  const [isHiddenNavbarOpen, setIsHiddenNavbarOpen] = useState<boolean>(false)

  const activeClassName =
    "relative self-stretch flex items-center text-[1.5rem] text-primary font-bold cursor-pointer hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary"
  const unActiveClassName =
    "relative self-stretch flex items-center text-[1.5rem] font-bold cursor-pointer hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:transition-all after:duration-300 after:transform after:scale-x-0 hover:after:scale-x-100"

  return (
    <div className="w-[1260px] h-[3.5rem] px-4 xl:px-0 flex justify-between items-center bg-white">
      <div
        className="logo-container text-[1.5rem] cursor-pointer"
        onClick={() => navigator("/")}
      >
        <h1 className="text-blue-500">
          TRAVEL<strong className="text-primary">CARE</strong>
        </h1>
      </div>
      <div className="links-container h-full hidden sm:flex gap-4 justify-center">
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
      <div className="log-button-container hidden md:flex">
        <Space align="center">
          <Button
            className="h-[2.5rem] rounded-full text-white bg-blue-500 border-none hover:bg-blue-500/70"
            onClick={() => navigator("/login/signIn")}
          >
            Sign in
          </Button>
          <Button
            className="h-[2.5rem] rounded-full text-white bg-primary border-none hover:bg-primary/70"
            onClick={() => navigator("/login/signUp")}
          >
            Sign up for free!
          </Button>
        </Space>
      </div>
      <div
        className="flex md:hidden cursor-pointer"
        onClick={() => setIsHiddenNavbarOpen((prev) => !prev)}
      >
        <AiOutlineMenu size={30} />
      </div>

      <div
        className={`absolute md:hidden bg-white w-full top-full left-0 h-screen transition-all -z-10 box-border ${isHiddenNavbarOpen ? "open" : "close"
          }`}
      >
        <ResizedNavlinks
          navItems={navItems}
          navigator={navigator}
          setIsHiddenNavbarOpen={setIsHiddenNavbarOpen}
        />
      </div>
    </div>
  )
}

export default NavBar
