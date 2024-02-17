import { Application } from 'express';
import { authRoutes } from './routes/auth.route';

const BASE_PATH = '/api/v1';

export const appRoutes = (app: Application): void => {
  app.use(BASE_PATH, authRoutes());
};
