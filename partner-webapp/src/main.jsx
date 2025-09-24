import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import ConsentResultPage from './ConsentResultPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/consent-result" element={<ConsentResultPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
