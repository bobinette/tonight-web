import { Project, Task } from 'types';

import {
  create,
  list,
  createTask as createTaskApi,
  markAsDone as markAsDoneApi,
  reorder as reorderApi,
} from './api';

const createProjectAtomic = async (project: Project) => {
  await create(project);
};

export const createProject = async (
  project: Project,
  setProjects: Function
) => {
  await createProjectAtomic(project);
  await loadProjects(setProjects);
};

export const loadProjects = async (setProjects: Function) => {
  const projects = await list();
  setProjects(projects);
};

export const createTask = async (task: Task, setProjects: Function) => {
  await createTaskApi(task);
  await loadProjects(setProjects);
};

export const markAsDone = async (task: Task, setProjects: Function) => {
  await markAsDoneApi(task);
  await loadProjects(setProjects);
};

export const reorder = async (
  project: Project,
  tasks: Task[],
  setProjects: Function
) => {
  await reorderApi(project, tasks);
  await loadProjects(setProjects);
};
