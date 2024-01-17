// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';
import Logout from './components/Logout';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" >
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="home" element={<Home />} />
          <Route path="logout" element={<Logout />} />

        </Route>
      </Routes>
    </Router>
  );
}


export default App;


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Redirection vers la page de connexion après le rendu initial
const initialPath = window.location.pathname;
if (initialPath === '/' || initialPath === '/signup') {
  window.location.href = '/login';
}