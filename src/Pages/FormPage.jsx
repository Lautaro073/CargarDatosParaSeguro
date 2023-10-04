import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/alertas.css'
import axios from 'axios';
function FormPage() {
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert-custom alert-${type}`;
        alertDiv.textContent = message;
    
        document.body.appendChild(alertDiv);
    
        // Dar un pequeño tiempo para que la alerta inicialice y luego agregar la clase 'show'
        setTimeout(() => {
            alertDiv.classList.add('show');
        }, 10);
    
        // Después de 3 segundos, remover la alerta
        setTimeout(() => {
            alertDiv.classList.remove('show');
            // Esperamos que termine la transición de salida y luego eliminamos el elemento del DOM
            setTimeout(() => {
                alertDiv.remove();
            }, 310); // 10 ms adicionales para asegurarnos de que la transición ha terminado
        }, 3000);
    }

  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    birthDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post("/alumnos", formData);  // formData es el estado que contiene los datos del formulario
      showAlert("Datos agregados correctamente", "success");
    } catch (error) {
      console.error("Hubo un error al agregar el alumno:", error);
      showAlert("Error al agregar datos, recargar pagina y reintentar", "error");
    }
  };
  


  return (
    <div className="container bg-dark text-white">
      <h1>Ingrese sus datos</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="dni" className="form-label">DNI</label>
          <input type="text" className="form-control" id="dni" name="dni" value={formData.dni} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">Fecha de Nacimiento</label>
          <input type="date" className="form-control" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} placeholder='dd/mm/aaaa'  required />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}

export default FormPage;
