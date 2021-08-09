import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './utils/queryClient';

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />

            <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
