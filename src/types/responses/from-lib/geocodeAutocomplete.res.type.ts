export interface IGeocodeAutocomplete {
  address_line1: string
  address_line2: string
  formatted: string
  lon: number
  lat: number
  city: string
  country: string
  state: string
}

export type GeocodeAutocompleteResponse = {
  query: any
  results: IGeocodeAutocomplete[]
}
