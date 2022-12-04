const express = require('express');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = [
  'https://localhost:8080',
  'https://myapplucasmartinezasensio38069664.wt',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('not allowed'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('hi im your first server in express');
});

app.get('/new-rout', (req, res) => {
  res.send('hi im a new rout');
});

app.get('/home', (req, res) => {
  res.send('Home Sweet Home');
});

app.listen(port, () => {
  console.log('my port ' + port);
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
