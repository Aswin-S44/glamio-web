import { users } from "../db/schemas/users";

type UserType = typeof users.$inferSelect;

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

export {};
