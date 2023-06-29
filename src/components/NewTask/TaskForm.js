import { useRef } from 'react';

import classes from './TaskForm.module.css';
import useInput from '../../hooks/use-input';

const TaskForm = (props) => {
  const taskInputRef = useRef();
  const taskAgeRef = useRef();
  const { value: text, onChange:textHandleChange, error:textError } = useInput('', (t) => t.trim().length !== 0) 
  const { value: age, onChange: ageHandleChange, error: ageError } = useInput('', (t) => t.trim().length !== 0 && +t > 0) 
  
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(textError,ageError)
    if (textError || textError === null) {
      taskInputRef.current.focus()
      return;
    }
    if (ageError || ageError === null) {
      console.log('print', ageError)
      taskAgeRef.current.focus()
      return;
    }
    props.onEnterTask(text, age);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input className={`${textError && classes.invalid}`} type='text' ref={taskInputRef} value={text} onChange={textHandleChange} placeholder='name'/>
      <input className={`${ageError && classes.invalid}`} type='number' ref={taskAgeRef} value={age} onChange={ageHandleChange} placeholder='age'/>
      <button>{props.loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;