import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './Pages/FormPage';
import TablePage from './Pages/TablePage';
import './Css/app.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/formulario" element={<FormPage />} />
        <Route path="/tabla" element={<TablePage />} />
        <Route path="/" element={<FormPage />} />  {/* Página principal */}
      </Routes>
    </Router>
  );
}

export default App;

