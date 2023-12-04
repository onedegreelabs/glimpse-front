import axios from 'axios';
import Env from '../config/env.json';

const connection = function () {
  const serverConnection = axios.create({
    baseURL: Env['glimpse-dev'],
  });
  return serverConnection;
};

export const axiosInstance = connection();
