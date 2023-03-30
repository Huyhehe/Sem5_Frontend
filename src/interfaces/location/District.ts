import BaseEntity from "./BaseEntity"
import { Ward } from "./Ward"

export type District = BaseEntity & {
  wards: Ward[]
}
