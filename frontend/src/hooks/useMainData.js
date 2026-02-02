import { useQuery } from '@tanstack/react-query'
import { fetchMainData } from '../api/main'

export const useMainData = () => {
  return useQuery({
    queryKey: ['mainData'],
    queryFn: fetchMainData,
  })
}
