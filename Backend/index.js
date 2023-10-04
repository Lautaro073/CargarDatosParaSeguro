const express = require('express');
const alumnos = require('./Router/alumnos');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use('/api/alumnos', alumnos);

app.listen(port, () => {
  console.log(`Servidor corriendo en ${port}`);
});
