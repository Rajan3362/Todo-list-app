export interface Task {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  category?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFilters {
  category?: string;
  completed?: boolean;
  priority?: string;
}

export interface TaskSort {
  field: keyof Task;
  direction: 'asc' | 'desc';
}