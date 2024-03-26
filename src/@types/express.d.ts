declare namespace Express {
  export interface Request {
    user: {
      id: string,
      permissions: string[],
      orgId: string,
    };
    tenant: mongoose.Connection
  }
}
