interface ProjectInfo {
    title: string;
    status: {
      label: string;
      percentage: number;
    };
    tasks: {
      completed: number;
      total: number;
    };
    dueDate: string;
    budget: string;
  }