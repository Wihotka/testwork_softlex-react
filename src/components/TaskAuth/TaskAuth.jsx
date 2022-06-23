import React, { useState } from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import { getCookie } from '../../utils/tasks';
import { useSelector } from 'react-redux';
import classes from './TaskAuth.module.css';

const TaskAuth = ({ auth }) => {
  const token = useSelector(state => state.token.data);
  const cookie = getCookie('token');
  
  const [user, setUser] = useState({
    login: '',
    password: ''
  })

  const signIn = (event) => {
    event.preventDefault();
    const newUser = {
      ...user
    }
    auth(newUser);
    setUser({
      login: '',
      password: ''
    });
  }

  return (
    <div>
      {(!token && !cookie) ? 
        <form className={classes.form}>
          <MyInput
            value={user.login}
            onChange={event => setUser({ ...user, login: event.target.value })}
            type="text"
            placeholder="Your login"
          />
          <MyInput
            value={user.password}
            onChange={event => setUser({ ...user, password: event.target.value })}
            type="password"
            placeholder="Your password"
          />
          <div className={classes.formBtns}>
            <MyButton onClick={signIn}>Sign in</MyButton>
          </div>
        </form>
      : <h4 className={classes.formAdmin}>ADMIN</h4>}
    </div>
);
};

export default TaskAuth;
