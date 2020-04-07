import React, { useMemo, useCallback } from 'react';

import { useToggle } from 'hooks';
import { Release, Task } from 'types';

import TaskList from './task-list';

interface Props {
  release: Release;

  onCreate(task: Task, releaseUuid: string): void;
  onUpdate(task: Task): Promise<void>;
  onDone(task: Task): void;
  onReorder(tasks: Task[]): void;
  onDeleteTask(task: Task): Promise<void>;
}

const ReleaseBlock = ({
  release,
  onCreate,
  onUpdate,
  onDone,
  onReorder,
  onDeleteTask,
}: Props) => {
  const [collapsed, collapse] = useToggle(false);

  const doneTasks = useMemo(
    () => release.tasks.filter(t => t.status === 'DONE'),
    [release]
  );
  const onCreateTask = useCallback(
    (task: Task) => onCreate(task, release.uuid),
    [release, onCreate]
  );
  return (
    <div className="card">
      <button className="button-phantom w-100" onClick={collapse}>
        <div className="flex-full-row">
          <div>
            <strong>{release.title}</strong>
          </div>
          <div className="flex-center">
            <span>
              {doneTasks.length} / {release.tasks.length} tasks
            </span>
            <i className="material-icons">
              {collapsed ? 'expand_more' : 'expand_less'}
            </i>
          </div>
        </div>
      </button>
      {!collapsed && (
        <TaskList
          tasks={release.tasks}
          onDone={onDone}
          onCreate={onCreateTask}
          onUpdate={onUpdate}
          onReorder={onReorder}
          onDeleteTask={onDeleteTask}
        />
      )}
    </div>
  );
};

export default ReleaseBlock;
