export interface Car {
  id: number
  name: string
  type: string
  engine: string
  price: number
  info: string[]
  image: string
  images?: string[]
  features?: Record<string, string | number>
  versions?: string[]
  colors?: { name: string; hex: string }[]
  addons?: string[]
}

export interface Filters {
  type: string
  engine: string
  priceFrom: number | null
  priceTo: number | null
}
