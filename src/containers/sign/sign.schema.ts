import * as z from 'zod';

export const emailScema = z.object({
  email: z.string().email({message: 'email is not vaild.'}),
});

export const codeSchema = z.object({
  code: z.string().min(6).max(6),
});
