import React from 'react';
import useFetch from '../../hooks/use-fetch';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const [fetchTasks, isLoading, error] = useFetch()

  function dataHandler(taskText,age, data) {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText, age };
    props.onAddTask(createdTask);
  }

  const enterTaskHandler = (taskText, age) => {
    let obj = {
      method: 'POST',
      body: JSON.stringify({ text: taskText , age }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    fetchTasks(obj, dataHandler.bind(null, taskText, age))
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
