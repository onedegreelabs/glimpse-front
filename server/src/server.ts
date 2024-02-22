import 'express-async-errors';
import http from 'http';
import {
  Application,
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
// import {config} from '@/config';
import {CustomError, IErrorResponse} from '@/shared/custom-error-handler';
import {appRoutes} from '@/routes';
import cookieParser from 'cookie-parser';

const SERVER_PORT = 8000;

export const start = (app: Application): void => {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  authErrorHandler(app);
  startServer(app);
};

const securityMiddleware = (app: Application): void => {
  // app.set('trust proxy', 1);
  app.use(cookieParser());
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    })
  );
};

const standardMiddleware = (app: Application): void => {
  app.use(compression());
  app.use(json({limit: '200mb'}));
  app.use(urlencoded({limit: '200mb', extended: true}));
};

const routesMiddleware = (app: Application): void => {
  appRoutes(app);
};

const authErrorHandler = (app: Application): void => {
  app.use(
    (
      error: IErrorResponse,
      _req: Request,
      res: Response,
      next: NextFunction
    ) => {
      console.log('error', `MockServer ${error.comingFrom}: `, error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeError());
      }
      next();
    }
  );
};

const startServer = (app: Application): void => {
  try {
    const httpServer: http.Server = new http.Server(app);
    console.info(`Mock Server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      console.info(`Mock Server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    console.log('error', `MockServer startServer() method: `, error);
  }
};
