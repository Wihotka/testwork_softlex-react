import React from 'react';
import classes from './MyModal.module.css';
import { useNavigate } from 'react-router-dom';

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [classes.myModal]
  if (visible) {
    rootClasses.push(classes.active)
  }

  let navigate = useNavigate();

  const modalHandler = () => {
    setVisible(false);
    navigate('/tasks', {replace: true});
  }

  return (
    <div className={rootClasses.join(' ')} onClick={modalHandler}>
      <div className={classes.myModalContent} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;
