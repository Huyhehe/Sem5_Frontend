import { IconType } from "react-icons"
import { HotelBenefits } from "../constant"
import { hotel } from "../images"

interface HotelBenefits {
  label: string
  icon: IconType
}

export interface Hotel {
  LocationID: string
  Name: string
  PhoneNumber: string
  Website: string
  Email: string
  Rating: string
  Reviews: string
  Image: string
  isFavorite: boolean
  Benefits: HotelBenefits[]
}

export const hotelList: Hotel[] = [
  {
    LocationID: "1",
    Name: "The Hoiana",
    PhoneNumber: "1-800-555-1234",
    Website: "https://www.example.com",
    Email: "thehoiana@gmail.com",
    Rating: "4.5",
    Reviews: "102",
    Image: hotel,
    isFavorite: true,
    Benefits: [
      { ...HotelBenefits.WIFI },
      { ...HotelBenefits.PARKING_LOT },
      { ...HotelBenefits.POOL },
      { ...HotelBenefits.WEBSITE },
    ],
  },
  {
    LocationID: "2",
    Name: "Let it Cam Lo",
    PhoneNumber: "1-800-555-1234",
    Website: "https://www.example.com",
    Email: "thehoiana@gmail.com",
    Rating: "3.5",
    Reviews: "1",
    Image: hotel,
    isFavorite: false,
    Benefits: [
      { ...HotelBenefits.WIFI },
      { ...HotelBenefits.POOL },
      { ...HotelBenefits.WEBSITE },
    ],
  },
  {
    LocationID: "3",
    Name: "The Little Hoi An",
    PhoneNumber: "1-800-555-1234",
    Website: "https://www.example.com",
    Email: "thehoiana@gmail.com",
    Rating: "5",
    Reviews: "2041",
    Image: hotel,
    isFavorite: false,
    Benefits: [
      { ...HotelBenefits.WIFI },
      { ...HotelBenefits.POOL },
      { ...HotelBenefits.WEBSITE },
    ],
  },
  {
    LocationID: "4",
    Name: "Vinpearl Hoi An",
    PhoneNumber: "1-800-555-1234",
    Website: "https://www.example.com",
    Email: "thehoiana@gmail.com",
    Rating: "4.7",
    Reviews: "12480",
    Image: hotel,
    isFavorite: true,
    Benefits: [
      { ...HotelBenefits.WIFI },
      { ...HotelBenefits.POOL },
      { ...HotelBenefits.PARKING_LOT },
      { ...HotelBenefits.WEBSITE },
    ],
  },
]
