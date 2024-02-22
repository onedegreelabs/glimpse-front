import {customAxios} from './headers';

export const checkAuth = async ({email}: {email: string}) => {
  const {data} = await customAxios.post('/auth-check', {email});
  return data;
};

export const signupORsignin = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const credentials = Buffer.from(`${email}:${code}`).toString('base64');

  try {
    const {data} = await customAxios.post(
      '/signup-or-signin',
      {},
      {
        headers: {
          Authorization: `Bearer ${credentials}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error('Error during signup or signin:', error);
    throw error;
  }
};

export const signout = async ({email}: {email: string}) => {
  await customAxios.post('/signout', {email});
};

export const getCurrentUser = async () => {
  const {data} = await customAxios.get('/current-user', {
    withCredentials: true,
  });
  return data;
};
