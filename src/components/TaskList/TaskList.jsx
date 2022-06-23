import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import classes from './TaskList.module.css';

const TaskList = ({ tasks, title }) => {
  if (!tasks.length) {
    return (
      <h2 className={classes.listHeading}>Posts aren't found!</h2>
    )
  }

  return (
    <div className={classes.list}>
      <h2 className={classes.listHeading}>{title}</h2>
        {tasks.map(task =>
          <TaskItem
            key={task.id}
            task={task}
          />
        )}
    </div>
  );
};

export default TaskList;
