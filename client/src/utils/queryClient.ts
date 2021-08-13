import { AxiosError } from 'axios';
import { QueryClient } from 'react-query';
import queryKeys from './queryKeys';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            onError: (e) => {
                const error = e as AxiosError;
                if (error.response?.status === 401) {
                    queryClient.setQueryData(queryKeys.isAuth, false);
                } else {
                    queryClient.setQueryData(queryKeys.snackbarError, true);
                }
            },
        },
    },
});
