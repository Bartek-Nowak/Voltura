export interface Car {
  id: number
  name: string
  type: string
  engine: string
  price: number
  image: string
  images?: string[]
  features?: Record<string, string | number>
}

export interface Filters {
  type: string
  engine: string
  priceFrom: number | null
  priceTo: number | null
}
