import React, { useState } from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import classes from './TaskFormEdit.module.css';

const TaskFormEdit = ({ edit, oldTask }) => {
  const [task, setTask] = useState({
    ...oldTask
  })

  const editTask = (event) => {
    event.preventDefault();
    const newTask = {
      ...task
    }
    edit(newTask);
  }

  return (
    <form>
      <h3 className={classes.formHeading}>Edit your task</h3>
      <label>
        <span className={classes.formLabel}>Text</span>
        <MyInput
          value={task.text}
          onChange={event => setTask({ ...task, text: event.target.value })}
          type="text"
          placeholder="Edit your text"
        />
      </label>
      <label>
      <span className={classes.formLabel}>Status</span>
        <MyInput
          value={task.status}
          onChange={event => setTask({ ...task, status: event.target.value })}
          type="number"
          placeholder="Edit your status"
        />
      </label>
      <MyButton onClick={editTask}>Edit task</MyButton>
    </form>
);
};

export default TaskFormEdit;
