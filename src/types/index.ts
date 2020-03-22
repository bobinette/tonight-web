export interface Project {
  uuid: string | null;
  name: string;
  slug: string;

  description?: string;

  tasks: Task[];
}

export const newProject = (name: string): Project => ({
  uuid: null,
  name,
  slug: '',
  tasks: [],
});

export interface Task {
  uuid: string | null;
  title: string;
  status: string;

  project: Project;
}

export const newTask = (title: string, project: Project): Task => ({
  uuid: null,
  title,
  project,
  status: 'TODO',
});
