import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { task } = req.body;
  if (!task) {
    res.status(400).json({ error: "please provide task" });
    return;
  }
  try {
    const userResponse = await supabase.auth.getUser();

    if (userResponse.error) {
      res.status(400).json({ error: userResponse.error.message });
      return;
    }

    const user_id = userResponse.data.user?.id;

    if (!user_id) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          task,
          creator: user_id,
          modifiers: [user_id], // Creator is the first modifier
        },
      ])
      .select();

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userResponse = await supabase.auth.getUser(token);
    if (userResponse.error) {
      res.status(400).json({ error: userResponse.error.message });
      return;
    }
    const user_id = userResponse.data.user?.id;
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("creator", user_id);

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userResponse = await supabase.auth.getUser(token);
    if (userResponse.error) {
      res.status(400).json({ error: userResponse.error.message });
      return;
    }
    const user_id = userResponse.data.user?.id;
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", req.params.id)
      .eq("creator", user_id)
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { task } = req.body;
  if (!task) {
    res.status(400).json({ error: "Task description is required" });
    return;
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userResponse = await supabase.auth.getUser(token);
    if (userResponse.error) {
      res.status(400).json({ error: userResponse.error.message });
      return;
    }
    const user_id = userResponse.data.user?.id;

    // Append current user to modifiers array
    const { data: existingTask, error: existingTaskError } = await supabase
      .from("tasks")
      .select("modifiers")
      .eq("id", req.params.id)
      .single();

    if (existingTaskError) {
      res.status(400).json({ error: existingTaskError.message });
      return;
    }

    const updatedModifiers = [...new Set([...existingTask.modifiers, user_id])];

    const { data, error } = await supabase
      .from("tasks")
      .update({
        task,
        modified_at: new Date().toISOString(),
        modifiers: updatedModifiers,
      })
      .eq("id", req.params.id)
      .eq("creator", user_id)
      .select();

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userResponse = await supabase.auth.getUser(token);
    if (userResponse.error) {
      res.status(400).json({ error: userResponse.error.message });
      return;
    }
    const user_id = userResponse.data.user?.id;
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", req.params.id)
      .eq("creator", user_id);

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
