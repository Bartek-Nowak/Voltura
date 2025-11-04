import api from './axios'

export interface FaqItem {
  id: number
  question: string
  answer: string
}

export const getFaq = async (): Promise<FaqItem[]> => {
  try {
    const response = await api.get<FaqItem[]>('/faq')
    return response.data
  } catch (error) {
    console.error('Error fetching FAQ:', error)
    throw error
  }
}
