import {Application} from 'express';
import {authRoutes} from './routes/auth.route';
import {userRoutes} from './routes/user.route';
import {verifyToken} from './middleware/auth.middleware';

const BASE_PATH = '/api/v1';

export const appRoutes = (app: Application): void => {
  app.use(BASE_PATH, authRoutes());
  app.use(BASE_PATH, verifyToken, userRoutes());
};
