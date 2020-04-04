import api from 'api';

import { Project, Task } from 'types';

export const update = async (project: Project): Promise<Project> => {
  const resp = await api.post(`/projects/${project.uuid}`, project);
  return resp.data.data;
};

export const get = async (uuid: string): Promise<Project> => {
  const resp = await api.get(`/projects/${uuid}`);
  return resp.data.data;
};

export const find = async (slug: string): Promise<Project> => {
  const resp = await api.get(`/projects/slug/${slug}`);
  return resp.data.data;
};

export const updateTask = async (task: Task) => {
  await api.post(`/tasks/${task.uuid}`, task);
};
