const express = require('express');
const db = require('../config/db');  // Asegúrate de que la ruta sea correcta

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const { month } = req.query;  // Obtén el parámetro de consulta 'month'
      let query = 'SELECT * FROM alumnos';
      if (month) {
        query += ` WHERE MONTH(birthDate) = ?`;  // Si 'month' está presente, filtra por mes
      }
      const [results] = await db.execute(query, [month]);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  });
  
// Endpoint para agregar nuevos datos de alumnos
router.post('/', async (req, res) => {
    try {
      const { name, dni, birthDate } = req.body;
      const query = 'INSERT INTO alumnos (name, dni, birthDate) VALUES (?, ?, ?)';
      const [result] = await db.execute(query, [name, dni, birthDate]);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  });

module.exports = router;
