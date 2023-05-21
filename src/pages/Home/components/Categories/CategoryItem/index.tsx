import { ReactNode, useState } from "react"

interface SubCategories {
  text: string
  url: string
}

export interface CategoryItemProps {
  title: string
  icon: ReactNode
  subCategories?: SubCategories[]
  onClick?: () => void
}

function CategoryItem({
  title,
  icon,
  subCategories,
  onClick,
}: CategoryItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOnClick = () => {
    if (!subCategories) {
      return onClick?.()
    }
    return setIsOpen((prev) => !prev)
  }

  return (
    <div
      className="relative group h-[70px] py-3 px-4 cursor-pointer bg-white rounded-[1rem] border group border-black border-solid flex-1 hover:bg-black "
      onClick={handleOnClick}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold group-hover:text-white">{title}</span>
        <div>{icon}</div>
        {subCategories && subCategories?.length > 0 && isOpen && (
          <div className="transition-all absolute z-[1000] top-[115%] right-0 h-auto  bg-white shadow-lg rounded-xl">
            <div className="p-2">
              {subCategories?.map((item, idx) => (
                <div
                  className="py-4 px-6 hover:bg-[#f2f2f7] transition-all"
                  key={idx}
                >
                  <a href={item?.url}>{item?.text}</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryItem
