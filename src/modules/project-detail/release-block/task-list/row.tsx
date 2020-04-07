import React, { useCallback, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import EditableTextArea from 'components/editables/textarea';
import Menu from 'components/menu';

import { Task } from 'types';

interface Props {
  dragging: boolean;
  task: Task;
  index: number;
  onUpdate(task: Task): Promise<void>;
  onDone(task: Task): Promise<void>;
  onDelete(task: Task): Promise<void>;
}

const TaskRow = ({
  dragging,
  index,
  task,
  onUpdate,
  onDone,
  onDelete,
}: Props) => {
  const onUpdateTitle = useCallback(
    async (title: string) => {
      const updatedTask = { ...task, title };
      await onUpdate(updatedTask);
    },
    [task, onUpdate]
  );
  const onDeleteCallback = useCallback(async () => {
    onDelete(task);
  }, [task, onDelete]);
  const onDoneCallback = useCallback(async () => {
    onDone(task);
  }, [task, onDone]);
  const actions = useMemo(
    () => [
      {
        text: 'Delete',
        action: onDeleteCallback,
      },
    ],
    [onDeleteCallback]
  );
  return (
    <Draggable key={task.uuid!} draggableId={task.uuid!} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
          className={`list-element flex-full-row ${
            snapshot.isDragging ? 'dragging' : dragging ? 'dragging-other' : ''
          }`}
        >
          <div className="flex-baseline flex-1">
            {task.status === 'DONE' ? (
              <div>
                <i className="material-icons left-icon success">check_box</i>
              </div>
            ) : (
              <button className="button-phantom" onClick={onDoneCallback}>
                <i className="material-icons left-icon">
                  check_box_outline_blank
                </i>
              </button>
            )}
            <EditableTextArea
              className="w-100"
              value={task.title}
              onChange={onUpdateTitle}
            />
          </div>
          <div className="flex">
            <div>
              <Menu items={actions} />
            </div>
            <div>
              <i
                className={`material-icons dnd-handle`}
                {...provided.dragHandleProps}
              >
                reorder
              </i>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskRow;
