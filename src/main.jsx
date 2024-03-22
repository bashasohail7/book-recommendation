import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App'; // Your root component
import './index.css'
import { BookProvider } from './context/BookContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
      <BookProvider>

        <App />
      </BookProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)
