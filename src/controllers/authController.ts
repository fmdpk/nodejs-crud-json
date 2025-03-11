import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    res.status(401).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  // const { userId } = req.body; // Assuming userId is provided in the request body

  const { error } = await supabase.auth.signOut();

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json({ message: "User signed out successfully" });
  }
};
