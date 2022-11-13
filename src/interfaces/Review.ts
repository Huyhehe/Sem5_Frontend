export interface Review {
  id: number
  title: string
  address: string
  description: string
  price: number
  rate: number
  review: "Good" | "Bad" | "Average"
  image?: string
}
