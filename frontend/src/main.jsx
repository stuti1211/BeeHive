import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="244823807557-sr00u5bc2shenrooeiqi7a16i37oajm3.apps.googleusercontent.com">
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
</React.StrictMode>
)
