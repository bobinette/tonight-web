import React, { FC, useState, useEffect } from 'react';
import { memoize } from 'lodash';

import { Project, Task } from 'types';

import { createProject, loadProjects, createTask, markAsDone } from './actions';
import CreateButton from './create-button';
import ProjectCard from './project-card';

interface Props {}

const createProjectCurried = memoize(
  (setProjects: Function) => (project: Project) =>
    createProject(project, setProjects)
);

const createTaskCurried = memoize((setProjects: Function) => (task: Task) =>
  createTask(task, setProjects)
);

const markAsDoneCurried = memoize((setProjects: Function) => (task: Task) =>
  markAsDone(task, setProjects)
);

const ProjectList: FC<Props> = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    loadProjects(setProjects);
  }, []);

  return (
    <>
      {projects.map(project => (
        <ProjectCard
          key={project.uuid!}
          project={project}
          onCreateTask={createTaskCurried(setProjects)}
          onDone={markAsDoneCurried(setProjects)}
        />
      ))}
      <div className="card">
        <CreateButton
          className="w-100"
          onCreate={createProjectCurried(setProjects)}
        />
      </div>
    </>
  );
};

export default ProjectList;
