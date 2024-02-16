import { Application } from 'express';

const BASE_PATH = '/api/v1';

export const appRoutes = (_app: Application): void => {
  console.log(BASE_PATH);
};
