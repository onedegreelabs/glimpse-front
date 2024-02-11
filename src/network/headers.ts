import axios from 'axios';
import {config} from '@/lib/config';

export const axiosInstance = function () {
  const serverConnection = axios.create({
    baseURL: config['glimpse-rsvp'],
  });
  return serverConnection;
};

export const basicAuthInstance = function (email: string, code: string) {
  const authHeader = `Basic ${btoa(`${email}:${code}`)}`;

  const serverConnection = axios.create({
    headers: {
      Authorization: authHeader,
    },
    baseURL: config['glimpse-rsvp'],
  });
  return serverConnection;
};

export const socialAuthInstance = function (socialToken: string) {
  const authHeader = `Bearer ${socialToken}`;

  const serverConnection = axios.create({
    headers: {
      Authorization: authHeader,
    },
    baseURL: config['glimpse-rsvp'],
  });
  return serverConnection;
};

export const tokconfigalidInstance = function () {
  const token = localStorage.getItem('accessToken');
  const serverConnection = axios.create({
    baseURL: config['glimpse-dev'],
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return serverConnection;
};
