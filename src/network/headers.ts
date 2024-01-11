import axios from 'axios';
import Env from '../config/env.json';

export const axiosInstance = function () {
  const serverConnection = axios.create({
    baseURL: Env['glimpse-dev'],
    // baseURL: Env['sean-local'],
  });
  return serverConnection;
};

export const basicAuthInstance = function (email: string, code: string) {
  const authHeader = `Basic ${btoa(`${email}:${code}`)}`;

  const serverConnection = axios.create({
    headers: {
      Authorization: authHeader,
    },
    baseURL: Env['glimpse-dev'],
    // baseURL: Env['sean-local'],
  });
  return serverConnection;
};

export const socialAuthInstance = function (socialToken: string) {
  const authHeader = `Bearer ${socialToken}`;

  const serverConnection = axios.create({
    headers: {
      Authorization: authHeader,
    },
    baseURL: Env['glimpse-dev'],
    // baseURL: Env['sean-local'],
  });
  return serverConnection;
};

export const tokenValidInstance = function () {
  const token = localStorage.getItem('accessToken');
  const serverConnection = axios.create({
    baseURL: Env['glimpse-rsvp'],
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return serverConnection;
};
