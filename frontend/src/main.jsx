import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import AuthenticatedContextProvider from './contexts/AuthenticatedContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticatedContextProvider>
      <Router>
        <App />
      </Router>
    </AuthenticatedContextProvider>
  </React.StrictMode>,
)
