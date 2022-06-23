import React, { useState } from 'react';
import MyButton from '../UI/button/MyButton';
import MyModal from '../UI/modal/MyModal';
import TaskFormEdit from '../../components/TaskFormEdit/TaskFormEdit';
import TaskService from '../../API/TaskService';
import { getCookie } from '../../utils/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../store/slices/taskSlice';
import { Link } from 'react-router-dom';
import classes from './TaskItem.module.css';

const TaskItem = (props) => {
  const [modalEdit, setModalEdit] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector(state => state.token.data);
  const cookie = getCookie('token');

  const editTask = async (task) => {
    const response = await TaskService.postToken(task, cookie);
    if (response.data.status === 'ok') {
      dispatch(addTask(task));
      setModalEdit(false);
    }
  }

  return (
    <div className={props.task.status === 0 || props.task.status === 1 ? classes.task : classes.task + ' ' + classes.taskDone}>
      <div className={classes.taskContent}>
        <h4 className={classes.taskTitle}>{props.task.username}</h4>
        <span className={classes.taskEmail}>{props.task.email}</span>
      </div>
      <p className={classes.taskText}>{props.task.text}</p>
      {(token || cookie) &&
        <div className={classes.taskBtns}>
          <Link to={'edit/' + props.task.id}>
            <MyButton onClick={() => setModalEdit(true)}>Edit</MyButton>
          </Link>
        </div>
      }
      <MyModal visible={modalEdit} setVisible={setModalEdit} >
        <TaskFormEdit edit={editTask} oldTask={props.task} />
      </MyModal>
    </div>
  );
};

export default TaskItem;
