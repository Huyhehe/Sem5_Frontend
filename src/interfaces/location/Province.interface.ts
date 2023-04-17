import BaseEntity from "./BaseEntity.interface"
import { District } from "./District.interface"

export type Province = BaseEntity & {
  districts: District[]
  description: string | null
}
