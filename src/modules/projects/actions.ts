import { Project } from 'types';

import { create, list } from './api';

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
