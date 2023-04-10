import { BiHotel, BiRestaurant } from "react-icons/bi"
import { MdCardTravel, MdMoreVert } from "react-icons/md"
import { RiEarthFill, RiScalesFill } from "react-icons/ri"
import CategoryItem from "./CategoryItem"

const categories = [
  {
    icon: <BiHotel className="group-hover:text-white" size={22} />,
    title: "Hotels",
  },
  {
    icon: <RiScalesFill className="group-hover:text-white" size={22} />,
    title: "Things to Do",
  },
  {
    icon: <MdCardTravel className="group-hover:text-white" size={22} />,
    title: "Vacation Rentals",
  },
  {
    icon: <BiRestaurant className="group-hover:text-white" size={22} />,
    title: "Restaurants",
  },
  {
    icon: <RiEarthFill className="group-hover:text-white" size={22} />,
    title: "Travel Stories",
  },
  {
    icon: <MdMoreVert className="group-hover:text-white" size={22} />,
    title: "More",
    children: [
      {
        text: "Add a Place",
        url: "",
      },
      {
        text: "Airlines",
        url: "",
      },
      {
        text: "Cruises",
        url: "",
      },
      {
        text: "Hire a Trip Designer",
        url: "",
      },
      {
        text: "Rental Cars",
        url: "",
      },
      {
        text: "Road Trips",
        url: "",
      },
      {
        text: "Travel Forums",
        url: "",
      },
      {
        text: "Travelers' Choice",
        url: "",
      },
    ],
  },
]

function Categories() {
  return (
    <div className="w-full flex items-center gap-x-3 ">
      {categories?.map((item, index: number) => (
        <CategoryItem key={index} data={item} />
      ))}
    </div>
  )
}

export default Categories
