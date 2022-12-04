import { AppContext } from "@/App"
import { signOutAPI } from "@/utils/http"
import { signOutUser } from "@/utils/localStorage"
import type { MenuProps } from "antd"
import { Dropdown } from "antd"
import { FunctionComponent, useContext, useState } from "react"
import { AiOutlineMenu, AiOutlineProfile, AiOutlineUser } from "react-icons/ai"
import { FiLogOut } from "react-icons/fi"
import { NavLink, useNavigate } from "react-router-dom"
import ResizedNavlinks from "./ResizedNavlinks"

interface NavBarProps {
  user: any
}

const NavBar: FunctionComponent<NavBarProps> = ({ user }) => {
  const navigator = useNavigate()
  const [isMobile, setIsMobile] = useState<boolean>(false)
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
  const { setLoading } = useContext(AppContext)
  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOutAPI
      signOutUser()
      setLoading(false)
      navigator("/login/signIn")
    } catch (error) {
      signOutUser()
      setLoading(false)
      navigator("/login/signIn")
    }
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex gap-1 items-center">
          <AiOutlineProfile size={20} />
          <span>Profile</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex gap-1 items-center">
          <AiOutlineProfile size={20} />
          <span>Profile</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex gap-1 items-center" onClick={handleSignOut}>
          <FiLogOut size={20} />
          <span>Sign out</span>
        </div>
      ),
    },
  ]
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
      <div className="user-dropdown hidden md:flex">
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          arrow
          className="cursor-pointer w-[10rem]"
        >
          <div className="flex gap-2 items-center">
            <AiOutlineUser size={20} />
            <span className="text-[1rem] font-medium">{user.username}</span>
          </div>
        </Dropdown>
      </div>
      <div
        className="flex md:hidden cursor-pointer"
        onClick={() => setIsMobile((prev) => !prev)}
      >
        <AiOutlineMenu size={30} />
      </div>

      <div
        className={`absolute md:hidden bg-white w-full top-full left-0 h-screen transition-all -z-10 box-border ${
          isMobile ? "open" : "close"
        }`}
      >
        <ResizedNavlinks
          navItems={navItems}
          navigator={navigator}
          setIsMobile={setIsMobile}
          user={user}
        />
      </div>
    </div>
  )
}

export default NavBar