export interface Project {
  uuid: string | null;
  name: string;

  tasks: Task[];
}

export const newProject = (name: string): Project => ({
  uuid: null,
  name,
  tasks: [],
});

export interface Task {
  uuid: string | null;
  title: string;

  project: Project;
}

export const newTask = (title: string, project: Project): Task => ({
  uuid: null,
  title,
  project,
});
