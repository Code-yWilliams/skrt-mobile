import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import React from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Required for persist to work properly, otherwise inactive queries will be garbage collected after the default of 5 minutes.
      // If you don't want your query data in the memory cache forever then set your own gcTime in the useQuery options.
      // Remember, the in-memory cache clears on app restart.
      gcTime: Infinity,
    },
  },
})

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

// Only these query keys will be written to async storage disk
const KEYS_TO_PERSIST: string[] = []

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister: asyncStoragePersister,
      maxAge: Infinity,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => {
          const shouldDehydrate = KEYS_TO_PERSIST.includes(
            query.queryKey[0] as any,
          )

          return shouldDehydrate
        },
      },
    }}
  >
    {children}
  </PersistQueryClientProvider>
)

export { QueryClientProvider, queryClient }
