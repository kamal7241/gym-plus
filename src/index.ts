import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/homeRoutes';
import v1Routes from './routes/v1';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swaggerConfig';

const app = express();
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || 'localhost';

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// routes for api/v1
app.use('/', homeRoutes);
app.use('/api/v1', v1Routes);

// swagger api documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
