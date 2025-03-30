export interface Todo {
  id: string;
  user_id: string;
  task: string;
  is_complete: boolean;
  priority: 1 | 2 | 3;
  state: 1 | 2 | 3 | 4;
  assignee?: string | null;
  task_date?: string;
  created_at: string;
}

export interface CreateTodoDto {
  task: string;
  priority?: 1 | 2 | 3;
  state?: 1 | 2 | 3 | 4;
  assignee?: string;
  task_date?: string;
}

export interface UpdateTodoDto extends Partial<CreateTodoDto> {
  is_complete?: boolean;
}

export interface PaginatedTodos {
  data: Todo[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  data: T | null;
  error: any;
  status: number;
  count?: number;
}
