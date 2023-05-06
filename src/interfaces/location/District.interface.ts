import BaseEntity from "./BaseEntity.interface"
import { Ward } from "./Ward.interface"

export type District = BaseEntity & {
  wards: Ward[]
  description: string | null
}
