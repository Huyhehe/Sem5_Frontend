export const convertUndefinedToNull = (params: any) => {
  for (const key in params) {
    if (params[key] === undefined) {
      params[key] = null
    }
  }
  return params
}
