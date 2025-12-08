import * as React from 'react';

import { getErrorMessage } from '@/lib/get-error-message';

type UseAsyncDataReturn<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

export function useAsyncData<T>(fetchFn: () => Promise<T>, errorMessage?: string): UseAsyncDataReturn<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const result = await fetchFn();
        setData(result);
        setError(null);
      } catch (error) {
        console.error('Failed to load data:', error);
        setError(errorMessage ?? getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, isLoading };
}
