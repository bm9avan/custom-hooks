import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/use-fetch';

function App() {
  const [tasks, setTasks] = useState([]);
  const [fetchTasks, isLoading, error] = useFetch()

  function dataHandler(data) {
    const loadedTasks = [];
    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    setTasks(loadedTasks)
  }

  useEffect(() => {
    fetchTasks(null,dataHandler)
  }, []); // adding fetch task and making this wrap in useCallback in use-fetch.js will remove the waring but it reminde of this logic whenever i see erroe

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={useFetch}
      />
    </React.Fragment>
  );
}

export default App;
