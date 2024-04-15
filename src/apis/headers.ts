import axios from 'axios';
import Env from '../config/env.json';

export const basicAuthInstance = function (email: string, code: string) {
  const authHeader = `Basic ${btoa(`${email}:${code}`)}`;

  const serverConnection = axios.create({
    headers: {
      Authorization: authHeader,
    },
    baseURL: Env['glimpse-rsvp'],
  });
  return serverConnection;
};

export const customAxios = axios.create({
  baseURL: Env['glimpse-rsvp'],
  withCredentials: true,
});
