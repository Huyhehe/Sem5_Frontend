import { checkStringContainNumberOrSpecialChar } from "@/utils/reusable"
import { Rule } from "antd/es/form"

export const validateStringInput = (
  message = "Please enter a valid value (not a number)"
) => {
  const validator: Rule = {
    validator(_, value) {
      if (value && checkStringContainNumberOrSpecialChar(value, "VN")) {
        return Promise.reject(new Error(message))
      }
      return Promise.resolve()
    },
  }
  return validator
}
