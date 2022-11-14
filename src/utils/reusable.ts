export const getRatingString = (rating: number) => {
  if (rating <= 2) {
    return "Bad"
  }
  if (rating > 2 && rating < 4) {
    return "Average"
  }
  return "Good"
}

export const toDouble = (value: number) => {
  return value.toFixed(1)
}
