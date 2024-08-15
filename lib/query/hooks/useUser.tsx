import { useQuery } from '@tanstack/react-query'
import keys from '../keys'

export const useUserQuery = () => {
  const { data: user } = useQuery({
    queryKey: keys.user,
  })

  return user ?? null
}
