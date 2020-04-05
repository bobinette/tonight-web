export interface UUIDed {
  uuid: string | null;
}

export interface Project {
  uuid: string | null;
  name: string;
  slug: string;

  description?: string;

  releases: Release[];
}

export const newProject = (name: string): Project => ({
  uuid: null,
  name,
  slug: '',
  releases: [],
});

export interface Release {
  uuid: string;
  title: string;
  description: string;

  project: Partial<Project>;
  tasks: Task[];
}

export const newRelease = (title: string): Release => ({
  uuid: '',
  title,
  description: '',

  project: {},
  tasks: [],
});

export interface Task {
  uuid: string | null;
  title: string;
  status: string;

  release: Partial<Release>;
}

export const newTask = (title: string): Task => ({
  uuid: null,
  title,
  release: {},
  status: 'TODO',
});
