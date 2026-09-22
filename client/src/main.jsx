import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-center" toastOptions={{ style: { background: '#1E1E27', color: '#fff' } }} />
  </React.StrictMode>,
);