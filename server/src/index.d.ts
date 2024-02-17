declare namespace Express {
  export interface Request {
    currentUser?: {
      id: string;
      name: string;
      email: string;
    };
  }
}
