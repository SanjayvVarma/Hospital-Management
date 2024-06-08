import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from "react-router-dom";
import DashboardProvider from "./contexts/DashboardProvider";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DashboardProvider>
      <Router>
        <App />
      </Router>
    </DashboardProvider>
  </React.StrictMode>,
)
