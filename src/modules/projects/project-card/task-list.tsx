import React, { FC, useState, useEffect } from 'react';

import { Project, Task, newTask } from 'types';

interface Props {
  project: Project;

  onCreate(task: Task): void;
}

const onKeyPress = (onCreate: Function) => (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (event.key == 'Enter') {
    onCreate();
  }
};

const TaskList: FC<Props> = ({ project, onCreate }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const tasks = project.tasks || [];

  return (
    <>
      {tasks.map(task => (
        <div className="list-element" key={task.uuid!}>
          <i className="material-icons left-icon">radio_button_unchecked</i>
          {task.title}
        </div>
      ))}
      <div>
        <div className="flex-aligned">
          <i className="material-icons left-icon">add_circle_outline</i>
          <input
            className="input-text-phantom w-100"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            onKeyPress={onKeyPress(() => {
              onCreate(newTask(newTaskTitle, project));
              setNewTaskTitle('');
            })}
            placeholder="New task..."
          />
        </div>
        <div className="w-100 align-right">
          <small className="muted">Press return to create</small>
        </div>
      </div>
    </>
  );
};

export default TaskList;
