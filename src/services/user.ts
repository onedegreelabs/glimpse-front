import {customAxios} from './headers';

export const verifyUser = async (accessToken: string | undefined) => {
  try {
    const {data} = await customAxios.get('/verify-token', {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};
