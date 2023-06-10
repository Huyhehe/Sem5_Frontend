import { HotelAmenity } from "@/types/responses/hotel"

export const shortenAmenities = (
  amenities: HotelAmenity[],
  max: number
): HotelAmenity[] => {
  if (amenities.length <= max) return amenities
  const newAmenities = amenities.slice(0, max)
  newAmenities.push({
    id: "more",
    name: `+${amenities.length - max} more`,
  })
  return newAmenities
}
