import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SiteDataProvider } from './context/SiteDataContext'
import { ToastProvider } from './context/ToastContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SiteDataProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </SiteDataProvider>
    </BrowserRouter>
  </StrictMode>,
)
