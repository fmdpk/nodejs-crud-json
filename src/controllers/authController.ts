import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

export const signUp = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error("Error requesting signup:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const signinWithOTP = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error("Error requesting Sign-in OTP:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const signinWithPassword = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error("Error requesting Sign-in:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const verifySigninOTP = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error("Error requesting Sign-in:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const verifySignupOTP = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error("Error requesting signup:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  try {
    // Send password reset email
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://localhost:4200/update-password",
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res
      .status(200)
      .json({ message: "Password reset email sent", responseData: data });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { password, rePassword } = req.body;

  if (!password || rePassword) {
    res.status(400).json({ error: "New password is required" });
    return;
  } else if (password !== rePassword) {
    res.status(400).json({ error: "password and rePassword are not same" });
    return;
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error requesting password update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error requesting user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json({ message: "User signed out successfully" });
    }
  } catch (error) {
    console.error("Error requesting logout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
