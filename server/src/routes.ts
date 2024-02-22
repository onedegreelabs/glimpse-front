import {Application} from 'express';
import {authRoutes} from './routes/auth.route';
import {authenticateUser} from './middleware/auth.middleware';
import {userRoutes} from './routes/user.route';

const BASE_PATH = '/api/v1';

export const appRoutes = (app: Application): void => {
  app.use(BASE_PATH, authRoutes());
  app.use(BASE_PATH, authenticateUser, userRoutes());
};
