import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer /> {/* Include ToastContainer here for global access */}
  </StrictMode>,
);
