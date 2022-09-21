import "express";

// **** Declaration Merging **** //

declare module "express" {
  export interface Request {
    signedCookies: Record<string, string>;
  }

  export interface Response {
    locals: {
      sessionUser: {
        id: string;
        email: string;
        iat: number;
        exp: number;
      };
    };
  }
}
