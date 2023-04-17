import { BaseAddress } from "./baseAddress.res.type"

export type WardResponse = Omit<BaseAddress, "description">
