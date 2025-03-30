import { Request, Response } from "express";
import { supabase } from "../supabaseClient";
import { PaginatedTodos } from "../models/todo";

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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
    const { task, priority = 2, state = 1, assignee, task_date } = req.body;
    if (!task || !assignee || !task_date) {
      res
        .status(400)
        .json({ error: "please provide task and assignee and task_date" });
      return;
    }
    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          user_id: user_id,
          task,
          priority,
          state,
          assignee,
          task_date: task_date || new Date().toISOString(),
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

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10", priority } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const token = req.headers.authorization?.split(" ")[1];
    const userResponse = await supabase.auth.getUser(token);
    if (userResponse.error) {
      res.status(400).json({ error: userResponse.error.message });
      return;
    }
    const user_id = userResponse.data.user?.id;
    let query = supabase
      .from("todos")
      .select("*", { count: "exact" })
      .eq("user_id", user_id)
      .range(offset, offset + parseInt(limit as string) - 1);

    const { data, error, count } = await query;

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      const response: PaginatedTodos = {
        data: data || [],
        pagination: {
          total: count || 0,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          totalPages: Math.ceil((count || 0) / parseInt(limit as string)),
        },
      };
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userResponse = await supabase.auth.getUser(token);
    if (userResponse.error) {
      res.status(400).json({ error: userResponse.error.message });
      return;
    }
    const user_id = userResponse.data.user?.id;
    const { task, priority, state, assignee, task_date } = req.body;

    if (!task || !assignee || !task_date || !priority || !state) {
      res.status(400).json({
        error:
          "please provide task and assignee and task_date and priority and state",
      });
      return;
    }

    const { data, error } = await supabase
      .from("todos")
      .update({
        task,
        priority,
        state,
        assignee,
        task_date,
      })
      .eq("id", req.params.id)
      .eq("user_id", user_id)
      .select();

    if (!data) {
      res.status(404).json({ error: "Todo not found" });
    } else if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];
    const userResponse = await supabase.auth.getUser(token);
    if (userResponse.error) {
      res.status(400).json({ error: userResponse.error.message });
      return;
    }
    const user_id = userResponse.data.user?.id;
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", req.params.id)
      .eq("user_id", user_id);

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json({ message: "Todo deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", req.params.id)
    .eq("user_id", req.user.id);

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json({ message: "Todo deleted successfully" });
  }
};
