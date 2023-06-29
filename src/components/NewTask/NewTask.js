import React from 'react';
import useFetch from '../../hooks/use-fetch';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const [fetchTasks, isLoading, error] = useFetch()

  function dataHandler(data, taskText) {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  }

  const enterTaskHandler = (taskText) => {
    let obj = {
      method: 'POST',
      body: JSON.stringify({ text: taskText }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    fetchTasks(obj, dataHandler.bind(null, taskText))
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
