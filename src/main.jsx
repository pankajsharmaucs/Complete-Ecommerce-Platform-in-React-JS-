import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './components/button/button.css'
import LoginCheck from './useContext/LoginCheck.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginCheck>
      <App />
    </LoginCheck>
  </React.StrictMode>,
)
