import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyPublicAssetVars } from './applyPublicAssetVars.js'

applyPublicAssetVars()
import './index.css'
import './styles/project-sheet.css'
import './fonts.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
