import * as z from 'zod';

export const SigninSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일입니다.' })
});
