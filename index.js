const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // app.get es un metodo compuesto por el req y el res
  res.send('hi im your first server in express');
  // con el res.send enviamos una respuesta al cliente
});

app.get('/new-rout', (req, res) => {
  res.send('hi im a new rout');
});

app.get('/products', (req, res) => {
  // como api nosotros enviamos un json como respuesta no un string(send) así enviamos datos a clientes del frontend o
  // aplicaciones que ya renderizan la información
  res.json({
    name: 'Product 1',
    price: 10,
  });
});

app.get('/home', (req, res) => {
  // como api nosotros enviamos un json como respuesta no un string(send) así enviamos datos a clientes del frontend o
  // aplicaciones que ya renderizan la información
  res.send('Home Sweet Home');
});

app.listen(port, () => {
  // con listen podemos indicar en que puerto debe estar escuchando
  console.log('my port ' + port);
  // en produccion no deberíamos tener console.log
});
