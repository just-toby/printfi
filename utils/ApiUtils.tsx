import type { NextApiRequest, NextApiResponse } from "next";

export type MiddlewareNextFunction = (result?: any) => void;

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function initMiddleware(
  middleware: (
    _req: NextApiRequest,
    _res: NextApiResponse<any>,
    _next: MiddlewareNextFunction
  ) => void
) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
