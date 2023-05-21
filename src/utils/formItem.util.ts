import {
  checkStringContainNumberOrSpecialChar,
  checkStringContainTextOrSpecialChar,
} from "./reusable"
import { Rule } from "antd/es/form"

export const validateStringInputForTextOnly = (
  message = "Please enter a valid value"
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

export const validateStringInputForNumberOnly = (
  message = "Please enter a valid value"
) => {
  const validator: Rule = {
    validator(_, value) {
      if (value && checkStringContainTextOrSpecialChar(value)) {
        return Promise.reject(new Error(message))
      }
      return Promise.resolve()
    },
  }
  return validator
}
