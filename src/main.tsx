// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import '../src/assets/css/base.css'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '../assets/css/base.css'
import '../src/assets/css/base.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)