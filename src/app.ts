import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import {pinoHttp, logger} from './utils/logging';
import mountRoutes from './api/routes';
import { validateApiKey } from './utils/validate';

const app = express();

app.use(express.json());

// Use Helmet for security
app.use(helmet());

// Apply gzip compression
app.use(compression());

// Use request-based logger for log correlation
app.use(pinoHttp);

app.use(validateApiKey);

// Mounting API routes
mountRoutes(app);

// Example endpoint
app.get('/', async (req: express.Request, res: express.Response) => {
  // Use basic logger without HTTP request info
  logger.info({
    logField: 'custom-entry',
    arbitraryField: 'custom-entry',
  }); // Example of structured logging
  // Use request-based logger with log correlation
  req.log.info('Child logger with trace Id.'); // https://cloud.google.com/run/docs/logging#correlate-logs
  res.send('LBSTECH Cloud Run API Server');
});

export default app;