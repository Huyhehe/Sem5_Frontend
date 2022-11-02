import { FunctionComponent } from "react"
import { NavLink } from "react-router-dom"

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
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
    <div className="h-[5rem] flex gap-4 justify-center items-center">
      {navItems.map((item, index) => {
        return (
          <NavLink
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
  )
}

export default NavBar
