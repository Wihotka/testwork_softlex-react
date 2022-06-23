import React from 'react';
import classes from './TaskNotFound.module.css';

const TaskAuth = ({ auth }) => {
  return (
    <div className={classes.notFound}>
      <h2>404</h2>
      <h3>Page is not found</h3>
    </div>
);
};

export default TaskAuth;
