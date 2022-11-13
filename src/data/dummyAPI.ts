import { Review } from "../interfaces/Review"

export const dummyAPI: Array<Review> = [
  {
    id: 1668321147438,
    title: "Hoi An Hotel",
    address: "Hoi An, Quang Nam, Viet Nam",
    description:
      "Hoi An Hotel is a 5-star hotel located in Hoi An, Quang Nam, Viet Nam",
    price: 100,
    rate: 4.5,
    review: "Good",
  },
  {
    id: 1668322732154,
    title: "Muong Thanh Hotel",
    address: "Da Nang, Viet Nam",
    description: "Muong Thanh Hotel is a 5-star hotel located in Da Nang",
    price: 200,
    rate: 4.5,
    review: "Bad",
  },
  {
    id: 1668322749377,
    title: "Nha Trang Hotel",
    address: "Nha Trang, Viet Nam",
    description: "Nha Trang Hotel is a 5-star hotel located in Nha Trang",
    price: 300,
    rate: 4.5,
    review: "Average",
  },
  {
    id: 1668322749378,
    title: "Nha Trang Hotel",
    address: "Nha Trang, Viet Nam",
    description: "Nha Trang Hotel is a 5-star hotel located in Nha Trang",
    price: 300,
    rate: 4.5,
    review: "Average",
  },
  {
    id: 1668322749379,
    title: "Nha Trang Hotel",
    address: "Nha Trang, Viet Nam",
    description: "Nha Trang Hotel is a 5-star hotel located in Nha Trang",
    price: 300,
    rate: 4.5,
    review: "Average",
  },
  {
    id: 1668322749380,
    title: "Nha Trang Hotel",
    address: "Nha Trang, Viet Nam",
    description: "Nha Trang Hotel is a 5-star hotel located in Nha Trang",
    price: 300,
    rate: 4.5,
    review: "Average",
  },
  {
    id: 1668322749388,
    title: "Nha Trang Hotel",
    address: "Nha Trang, Viet Nam",
    description: "Nha Trang Hotel is a 5-star hotel located in Nha Trang",
    price: 300,
    rate: 4.5,
    review: "Average",
  },
  {
    id: 1668322749381,
    title: "Nha Trang Hotel",
    address: "Nha Trang, Viet Nam",
    description: "Nha Trang Hotel is a 5-star hotel located in Nha Trang",
    price: 300,
    rate: 4.5,
    review: "Average",
  },
  {
    id: 1668322749382,
    title: "Nha Trang Hotel",
    address: "Nha Trang, Viet Nam",
    description: "Nha Trang Hotel is a 5-star hotel located in Nha Trang",
    price: 300,
    rate: 4.5,
    review: "Average",
  },
]
export const setAPI = (data: Review) => {
  dummyAPI.push(data)
}
export const getAPIById = (id: number) => {
  return dummyAPI.find((item) => item.id === id)
}
