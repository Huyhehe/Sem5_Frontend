import { BaseAddress, WardResponse } from "@/types/responses"
import { SelectType } from "@/types/responses/common"

export const getRatingString = (rating: string) => {
  if (Number(rating) <= 2) {
    return "Bad"
  }
  if (Number(rating) > 2 && Number(rating) < 4) {
    return "Average"
  }
  return "Good"
}

export const toDouble = (rating: string) => {
  return Number(rating).toFixed(1)
}

export const getFirstCharacterOfName = (firstName = "", lastName = "") => {
  return firstName.charAt(0) + lastName.charAt(0)
}

export const getAddressString = (address: any) => {
  return address
    ? `${address.street_address}, ${address.district}, ${address.province}, ${address.country}`
    : ""
}
export const getAddressStringWithoutStreetAddress = (address: any) => {
  return address
    ? `${address.district}, ${address.province}, ${address.country}`
    : ""
}

export const removeAccent = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
}

export const getDateTimeFormatted = (
  date: string,
  options: Intl.DateTimeFormatOptions | undefined = {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }
) => {
  return new Date(date).toLocaleString("en-US", options)
}

export const wordTransformByQuantity = (word: string, value: number) => {
  return value > 1 ? word + "s" : word
}

export const convertSnakeToCamelObjectArray = <T extends Record<string, any>>(
  objs: T[]
): T[] => {
  return objs.map((obj) => {
    const result: Record<string, any> = {}

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelKey = key.replace(/_([a-z])/g, (match, p1) =>
          p1.toUpperCase()
        )
        const value = obj[key]
        result[camelKey] =
          typeof value === "object"
            ? convertSnakeToCamelObjectArray(value)
            : value
      }
    }

    return result as T
  })
}

export const convertToStringIdObject = (object: any) => {
  return {
    ...object,
    id: object.id?.toString() || object.code?.toString(),
  }
}

export const convertToStringIdObjectArray = (objects: any[]) => {
  return objects.map((object) => convertToStringIdObject(object))
}

export const compareMatchingString = (str: string, input: string) => {
  return removeAccent(str || "")
    .toLowerCase()
    .includes(removeAccent(input || "").toLowerCase())
}

export const trimmedObject = (obj: any) => {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      obj[key] = value.trim()
    }
  }
  return obj
}

export const currencyFormatter = (
  value: number,
  locale = "vi-VN",
  currency = "VND"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export const currencyParser = (value: string | undefined): number => {
  return Number(value?.replace(/\D/g, "")) || 0
}

export const convertDataForSelectOptions = <T extends SelectType>(
  data: T[]
) => {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
  }))
}

export const convertDataForSelectOption = (
  data: BaseAddress | WardResponse | null | undefined
) => {
  return data
    ? {
        value: data.id,
        label: data.name,
      }
    : null
}

export const checkStringContainNumberOrSpecialChar = (
  str: string,
  locale: "VN" | "EN"
) => {
  if (str && locale === "VN") {
    return !/^[\p{L}'\s,-]+$/u.test(str)
  }
  if (str && locale === "EN") {
    return /(\d|[^\w\s])/.test(str)
  }
  return false
}

export const checkStringContainTextOrSpecialChar = (str: string) => {
  return !/^\d+$/.test(str)
}
