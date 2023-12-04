import {axiosInstance} from './headers';

export const sendMailWithCode = async (email: string) => {
  try {
    const response = await axiosInstance.post('/mails/code/send', {
      email,
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to send mail with code');
  }
};
