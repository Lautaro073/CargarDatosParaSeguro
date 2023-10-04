import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/alertas.css";
import axios from "axios";
import moment from "moment";
import * as XLSX from "xlsx"; // Importa la biblioteca xlsx
import ExcelJS from "exceljs";

function TablePage() {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(moment().format("M")); // Inicialización con el mes actual
  function showAlert(message, type) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert-custom alert-${type}`;
    alertDiv.textContent = message;

    document.body.appendChild(alertDiv);

    // Dar un pequeño tiempo para que la alerta inicialice y luego agregar la clase 'show'
    setTimeout(() => {
      alertDiv.classList.add("show");
    }, 10);

    // Después de 3 segundos, remover la alerta
    setTimeout(() => {
      alertDiv.classList.remove("show");
      // Esperamos que termine la transición de salida y luego eliminamos el elemento del DOM
      setTimeout(() => {
        alertDiv.remove();
      }, 310); // 10 ms adicionales para asegurarnos de que la transición ha terminado
    }, 3000);
  }
  const fetchData = async () => {
    if (month) {
      // Asegúrate de que haya un valor para el mes
      try {
        const response = await axios.get(`/alumnos`, { params: { month } });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [month]); // Refetch data when 'month' changes

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/alumnos/${id}`);
      fetchData(); // Refetch data to reflect the deletion
      showAlert("Se elimino correctamente", "success");
    } catch (error) {
      console.error("Error deleting record:", "error");
      showAlert("Error al eliminar ", error);
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Datos de los Alumnos");

    // Preparar los datos para la tabla
    const tableData = data.map((item) => [
      item.name,
      item.dni,
      moment.utc(item.birthDate).format("DD/MM/YYYY"),
    ]);
    // Configurar el ancho de las columnas
    worksheet.columns = [
      { width: 30 }, // Ancho para la columna 'Nombre'
      { width: 16 }, // Ancho para la columna 'DNI'
      { width: 25 }, // Ancho para la columna 'Fecha de Nacimiento'
    ];
    // Agregar la tabla al worksheet
    worksheet.addTable({
      name: "AlumnosTable",
      ref: "A1",
      headerRow: true,
      totalsRow: false,
      columns: [
        { name: "Nombre" },
        { name: "DNI" },
        { name: "Fecha de Nacimiento" },
      ],
      rows: tableData,
      style: {
        theme: "TableStyleMedium9",
        showRowStripes: true,
      },
    });

    const monthName = moment(month, "M").format("MMMM");
    const fileName = `datos_de_los_alumnos_${monthName}.xlsx`;

    // Escribe el archivo
    await workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  };
  return (
    <div className="container bg-dark text-white">
      <h1>Datos de los Alumnos</h1>
      <label htmlFor="month">Filtrar por mes: </label>
      <select
        className="bg-dark text-white"
        id="month"
        value={month}
        onChange={handleMonthChange}
      >
        <option value="1">Enero</option>
        <option value="2">Febrero</option>
        <option value="3">Marzo</option>
        <option value="4">Abril</option>
        <option value="5">Mayo</option>
        <option value="6">Junio</option>
        <option value="7">Julio</option>
        <option value="8">Agosto</option>
        <option value="9">Septiembre</option>
        <option value="10">Octubre</option>
        <option value="11">Noviembre</option>
        <option value="12">Diciembre</option>
      </select>

      <div className="table-responsive">
        {" "}
        {/* Envuelve la tabla con esta div */}
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Fecha de Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.dni}</td>
                <td>{moment.utc(item.birthDate).format("DD/MM/YYYY")}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-responsive">
        <div className="btn-right">
          <button
            onClick={exportToExcel}
            className="btn btn-success float-right"
          >
            <i className="fas fa-file-excel"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TablePage;
