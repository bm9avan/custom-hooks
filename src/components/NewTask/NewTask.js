import React, { useRef } from 'react';
import useFetch from '../../hooks/use-fetch';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const taskInputRef = useRef();
  const [fetchTasks, isLoading, error] = useFetch(dataHandler)

  function dataHandler(data) {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskInputRef.current };
    props.onAddTask(createdTask);
  }

  const enterTaskHandler = (taskText) => {
    taskInputRef.current = taskText
    let obj = {
      method: 'POST',
      body: JSON.stringify({ text: taskInputRef.current }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    fetchTasks(obj)
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
