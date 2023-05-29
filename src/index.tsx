import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './input.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<p>loading...</p>}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </BrowserRouter>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);

// format Number or String to comma based 
export const formatNumber = (num: number | string) => {
  if (num) return parseFloat(String(num)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return 0
}

// check if the given data includes the match 
export const textInclude = (data: string | any, match: string | undefined) => {
  return (data && match) ? (data || "")?.toLowerCase()?.includes((match || "")?.toLowerCase()) : false
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
