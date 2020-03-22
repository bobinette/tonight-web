import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import EditableTextArea from 'components/editables/textarea';

import { createTask, markAsDone, reorder } from 'modules/projects/api';
import TaskList from 'modules/tasks-list';

import { Project, Task } from 'types';

import { find, update } from './api';

const loadProject = async (setProject: Function, slug?: string) => {
  if (!slug) {
    return;
  }
  const project = await find(slug);
  setProject(project);
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    loadProject(setProject, slug);
  }, [setProject, slug]);

  const doneTasks = useMemo(
    () => project?.tasks.filter((t: Task) => t.status === 'DONE') || [],
    [project]
  );

  const onChangeDescription = useCallback(
    async (description: string) => {
      if (project) {
        const newProject = { ...project, description };
        await update(newProject);
        setProject(newProject);
      }
    },
    [project]
  );

  const onDone = useCallback(
    async (task: Task) => {
      await markAsDone(task);
      await loadProject(setProject, slug);
    },
    [setProject, slug]
  );
  const onCreate = useCallback(
    async (task: Task) => {
      await createTask(task);
      await loadProject(setProject, slug);
    },
    [setProject, slug]
  );
  const onReorder = useCallback(
    async (tasks: Task[]) => {
      if (!project) {
        return;
      }
      await reorder(project, tasks);
      await loadProject(setProject, slug);
    },
    [project, setProject, slug]
  );

  if (!slug) {
    return <div>invalid slug</div>;
  }

  if (!project) {
    return <div>LOADING?</div>;
  }

  console.log(project.description);
  return (
    <div>
      <h1>{project.name}</h1>
      <Link to="/">Back</Link>
      <div className="card">
        <EditableTextArea
          value={project.description || ''}
          onChange={onChangeDescription}
          placeholder="Add a description to your project..."
        />
      </div>
      <div className="card">
        <div className="flex-full-row">
          <strong>Tasks</strong>
          <div>
            {doneTasks.length} / {project.tasks.length} tasks
          </div>
        </div>
        <TaskList
          project={project}
          onDone={onDone}
          onCreate={onCreate}
          onReorder={onReorder}
        />
      </div>
    </div>
  );
};

export default ProjectDetail;
