import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

dotenv.config();

// Set up the express app
const app = express();

// Set up CORS
app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.get('*', (req, res) => res.status(404).send({
  message: 'Sorry, we lost you!',
}));

const config = {
  useNewUrlParser: true,
  useCreateIndex: true
};

mongoose.connect(
  process.env.DATABASE_URL,
  config
);

export default app;
