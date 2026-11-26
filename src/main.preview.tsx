// Entrada só do site público (sem painel), usada para gerar uma página única de visualização.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
