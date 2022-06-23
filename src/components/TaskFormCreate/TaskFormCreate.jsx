import React, { useState } from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import classes from './TaskFormCreate.module.css';

const TaskFormCreate = ({ create }) => {
  const [task, setTask] = useState({
    username: '',
    email: '',
    text: ''
  })

  const addNewTask = (event) => {
    event.preventDefault();
    const newTask = {
      ...task
    }
    create(newTask);
    setTask({
      username: '',
      email: '',
      text: ''
    });
  }

  return (
    <form>
      <h3 className={classes.formHeading}>Create your task</h3>
      <MyInput
        value={task.username}
        onChange={event => setTask({ ...task, username: event.target.value })}
        type="text"
        placeholder="Your name"
      />
      <MyInput
        value={task.email}
        onChange={event => setTask({ ...task, email: event.target.value })}
        type="email"
        placeholder="Your email"
      />
      <MyInput
        value={task.text}
        onChange={event => setTask({ ...task, text: event.target.value })}
        type="text"
        placeholder="Your task"
      />
      <MyButton onClick={addNewTask}>Create task</MyButton>
    </form>
);
};

export default TaskFormCreate;
