const express = require('express');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const whitelist = [
  'http://localhost:3000/',
  'https://my-store.up.railway.app/',
];
const options = {
  origin: (origin, callback) => {
    console.log(origin);
    console.log(whitelist.indexOf(origin) != -1);
    if (whitelist.indexOf(origin) != -1) {
      callback(null, true);
    } else {
      callback(new Error('not allowed ' + origin));
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

app.listen(PORT, () => {
  console.log('my port ' + PORT);
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
