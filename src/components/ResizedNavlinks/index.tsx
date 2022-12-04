import { Button, Space } from "antd"
import { Dispatch, FunctionComponent } from "react"
import { NavLink } from "react-router-dom"
import "./styles.css"

interface ResizedNavlinksProps {
  navItems: Array<{ title: string; link: string }>
  navigator: any
  setIsMobile: Dispatch<boolean>
  user?: any
}

const ResizedNavlinks: FunctionComponent<ResizedNavlinksProps> = ({
  navItems,
  navigator,
  setIsMobile,
  user = undefined,
}) => {
  return (
    <div className="resizedNavlinks flex flex-col gap-[1rem]">
      <div className="flex sm:hidden flex-col">
        {navItems.map((item, index) => {
          return (
            <NavLink
              key={index}
              end
              className={({ isActive }: any) =>
                isActive ? "activeLink link" : "unActiveLink link"
              }
              to={item.link}
              onClick={() => setIsMobile(false)}
            >
              {item.title}
            </NavLink>
          )
        })}
      </div>
      <div className="py-[1rem]">
        {user ? (
          <div className="flex flex-col">
            <div></div>
          </div>
        ) : (
          <Space direction="vertical" align="end" className="w-full">
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
        )}
      </div>
    </div>
  )
}

export default ResizedNavlinks
