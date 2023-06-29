import { useRef, useState } from 'react';

import classes from './TaskForm.module.css';

const TaskForm = (props) => {
  const taskInputRef = useRef();
  const taskAgeRef = useRef();
  const [text, setText] = useState('')
  const [age, setAge] = useState('')
  const [touch, setTouch] =useState(false) // we need to use two touched state variable for text and age separate but np;
  
  const textValid = text.trim().length !== 0
  const ageValid = age.trim().length !== 0 && +age > 0

  const submitHandler = (event) => {
    event.preventDefault();
    setTouch(true)
    if (!textValid) {
      taskInputRef.current.focus()
      return;
    }
    if (!ageValid) {
      taskAgeRef.current.focus()
      return;
    }
    props.onEnterTask(text, age);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input className={`${(!textValid && touch) && classes.invalid}`} type='text' ref={taskInputRef} value={text} onChange={(e) => setText(e.target.value)} placeholder='name'/>
      <input className={`${(!ageValid && touch) && classes.invalid}`} type='number' ref={taskAgeRef} value={age} onChange={(e) => setAge(e.target.value)} placeholder='age'/>
      <button>{props.loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
