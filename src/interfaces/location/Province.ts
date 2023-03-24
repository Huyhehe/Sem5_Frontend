import BaseEntity from "./BaseEntity"
import { District } from "./District"

export type Province = BaseEntity & {
  districts: District[]
  phoneCode: string
}
