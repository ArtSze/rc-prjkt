import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />

            <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
