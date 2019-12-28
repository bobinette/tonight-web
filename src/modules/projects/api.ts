import api from 'api';

import { Project, Task } from 'types';

export const create = async (project: Project): Promise<Project> => {
  const resp = await api.post('/projects', project);
  return resp.data.data;
};

export const list = async (): Promise<Project[]> => {
  const resp = await api.get('/projects');
  const tasks: Project[] = resp.data.data;
  return tasks;
};

export const createTask = async (task: Task): Promise<Task> => {
  const resp = await api.post('/tasks', task);
  return resp.data.data;
};

export const markAsDone = async (task: Task): Promise<Task> => {
  const resp = await api.post(`/tasks/${task.uuid}/done`);
  return resp.data.data;
};
