import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles'; // Added
import CssBaseline from '@mui/material/CssBaseline'; // Added
import theme from './theme'; // Added

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}> // Added
      <CssBaseline /> // Added
      <App />
    </ThemeProvider> // Added
  </StrictMode>,
)
