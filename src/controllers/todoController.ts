import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { task } = req.body;
  const userResponse = await supabase.auth.getUser();

  if (userResponse.error) {
    res.status(401).json({ error: userResponse.error.message });
    return;
  }

  const user_id = userResponse.data.user?.id;

  if (!user_id) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  const { data, error } = await supabase
    .from("todos")
    .insert([{ task, user_id }]);

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(201).json(data);
  }
};

export const getTodos = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", id);

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json({ message: "Todo deleted successfully" });
  }
};
