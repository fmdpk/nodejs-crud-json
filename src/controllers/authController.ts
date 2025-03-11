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

export const signinWithOTP = async (req: Request, res: Response) => {
  const { email } = req.body;

  // Send OTP to the user's email
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json({ message: "OTP sent to your email" });
    console.log(data);
  }
};

export const signinWithPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Send OTP to the user's email
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json({ message: "OTP sent to your email" });
    console.log(data);
  }
};

export const verifySigninOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  // Verify OTP
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp, // Change 'otp' to 'token' if this is the correct parameter
    type: "magiclink", // or 'magiclink' or 'recovery' based on your use case
  });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ message: "Sign-in successful", user: data });
};

export const verifySignupOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  // Verify OTP
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp, // Change 'otp' to 'token' if this is the correct parameter
    type: "signup", // or 'magiclink' or 'recovery' based on your use case
  });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ message: "Signup successful", user: data });
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
  const { error } = await supabase.auth.signOut();

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json({ message: "User signed out successfully" });
  }
};
