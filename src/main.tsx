/**
 * Dark-mode bootstrapping — runs synchronously before React renders to prevent
 * a flash of the wrong theme (FOUC). Reads localStorage first; falls back to
 * the OS system preference via prefers-color-scheme.
 */
const saved = localStorage.getItem('vib3scape-theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
if (saved === 'dark' || (!saved && prefersDark)) {
  document.documentElement.classList.add('dark')
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import '@/styles/globals.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root not found in index.html')

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)

