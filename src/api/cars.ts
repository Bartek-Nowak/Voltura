import api from './axios'
import type { Car, Filters } from '@/types/car'

type FilterOptions = {
  types: string[]
  engines: string[]
}

export const getCars = async (): Promise<Car[]> => {
  try {
    const response = await api.get<Car[]>('/cars')
    return response.data
  } catch (error) {
    console.error('Error fetching cars:', error)
    throw error
  }
}

export const getCarsByFilters = async (filters: Filters): Promise<Car[]> => {
  try {
    const params: Record<string, string | number> = {}

    if (filters.type) params.type = filters.type
    if (filters.engine) params.engine = filters.engine
    if (filters.priceFrom !== null && filters.priceFrom !== undefined)
      params.price_gte = filters.priceFrom
    if (filters.priceTo !== null && filters.priceTo !== undefined)
      params.price_lte = filters.priceTo

    const response = await api.get<Car[]>('/cars', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching filtered cars:', error)
    throw error
  }
}

export const getFilterOptions = async (): Promise<FilterOptions> => {
  try {
    const response = await api.get<FilterOptions>('/filters')
    return response.data
  } catch (error) {
    console.error('Error fetching filter options:', error)
    throw error
  }
}
