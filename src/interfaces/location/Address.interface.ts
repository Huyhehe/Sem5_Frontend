import { Country } from "./Country.interface"
import { District } from "./District.interface"
import { Province } from "./Province.interface"
import { Ward } from "./Ward.interface"

export interface Address {
  id: string
  country: Country
  province: Province
  district: District
  ward: Ward
  streetAddress: string
}
