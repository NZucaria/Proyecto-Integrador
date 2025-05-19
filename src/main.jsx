import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  ListadoDeProductos from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>

<ListadoDeProductos /> 


  </StrictMode>,
)
