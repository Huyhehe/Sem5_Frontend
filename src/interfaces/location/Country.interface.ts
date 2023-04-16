import BaseEntity from "./BaseEntity.interface"

export type Country = BaseEntity & {
  description: string | null
}
