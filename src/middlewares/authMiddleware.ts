import { Request, Response, NextFunction } from "express";
import { supabase } from "../supabaseClient";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
    return;
  }

  req.body.userId = data.user.id; // Attach the user ID to the request object
  next(); // Proceed to the next middleware or route handler
};
