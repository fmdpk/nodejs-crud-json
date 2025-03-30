import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "please provide email and password" });
    }

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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ error: "please provide userId" });
    }

    const { data, error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res
        .status(200)
        .json({ message: "user deleted successfully", data: data });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const signinWithOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "please provide email" });
    }

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

    if (!email || !password) {
      res.status(400).json({ error: "please provide email and password" });
    }

    // Send OTP to the user's email
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      if (data.user.factors !== undefined) {
        res.status(200).json({ data: data, message: "MFA is Activated" });
        return;
      }
      res.status(200).json({ data: data, message: "Sign-in successful" });
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

    if (!email || !otp) {
      res.status(400).json({ error: "please provide email and otp" });
    }

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

    if (!email || !otp) {
      res.status(400).json({ error: "please provide email and otp" });
    }

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

export const enrollMFA = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    // Return the QR code URI to display to the user
    res.json({
      data: data,
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
    });
  } catch (error) {
    console.error("Error requesting MFA enroll:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const verifyMFA = async (req: Request, res: Response) => {
  try {
    const { code, factorId } = req.body;

    if (!code || !factorId) {
      res.status(400).json({ error: "please provide code and factorId" });
    }

    const { data, error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: factorId, // You should store this during enrollment
      code,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json({ data: data, success: true });
  } catch (error) {
    console.error("Error requesting MFA verify:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const createMFAChallenge = async (req: Request, res: Response) => {
  try {
    const { factorId } = req.body;

    if (!factorId) {
      res.status(400).json({ error: "please provide factorId" });
    }

    const { data, error } = await supabase.auth.mfa.challenge({
      factorId: factorId,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error requesting MFA verify:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getAuthenticatorAssuranceLevel = async (
  req: Request,
  res: Response
) => {
  try {
    const { data, error } =
      await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error requesting MFA verify:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const verifyMFAChallenge = async (req: Request, res: Response) => {
  try {
    const { code, factorId, challengeId } = req.body;

    if (!code || !factorId || !challengeId) {
      res
        .status(400)
        .json({ error: "please provide code and factorId and challengeId" });
    }

    const { data, error } = await supabase.auth.mfa.verify({
      challengeId: challengeId,
      factorId: factorId,
      code: code,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error requesting MFA verify:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const unenrollMFA = async (req: Request, res: Response) => {
  try {
    const { factorId } = req.body;

    if (!factorId) {
      res.status(400).json({ error: "please provide factorId" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    const userResponse = await supabase.auth.getUser(token);

    if (userResponse.error) {
      res.status(400).json({ error: userResponse.error.message });
      return;
    }

    const { data, error } = await supabase.auth.mfa.unenroll({
      factorId: factorId,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    // Return the QR code URI to display to the user
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.error("Error requesting unenroll MFA:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const deleteUserFactor = async (req: Request, res: Response) => {
  try {
    const { factorId } = req.body;

    if (!factorId) {
      res.status(400).json({ error: "please provide factorId" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    const userResponse = await supabase.auth.getUser(token);
    const { data, error } = await supabase.auth.admin.mfa.deleteFactor({
      id: factorId,
      userId: userResponse.data.user?.id!,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    // Return the QR code URI to display to the user
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.error("Error requesting unenroll MFA:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "please provide email" });
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

  if (!password || !rePassword) {
    res.status(400).json({ error: "please provide password and rePassword" });
    return;
  } else if (password !== rePassword) {
    res.status(400).json({ error: "password and rePassword are not same" });
    return;
  } else if (!password || password.length < 6) {
    res.status(400).json({
      error: "Password must be at least 6 characters long",
    });
    return;
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
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

export const getNewSession = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    res.status(400).json({ error: "please provide refresh token" });
    return;
  }

  try {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refresh_token,
    });

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
