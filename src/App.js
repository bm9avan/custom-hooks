import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/use-fetch';

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [fetchTasks, isLoading, error] = useFetch()
  // console.log(data)
  // const fetchTasks = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null)
  //   try {
  //     const response = await fetch(
  //       'https://testbackend-dc297-default-rtdb.firebaseio.com/tasks.json'
  //     );
  //       console.log(response)
  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();


  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    (async () => {
      const loadedTasks = [];
      let data = await fetchTasks()
      console.log("in app", data)
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
      setTasks(loadedTasks)
    })()
    // fetchTasks();
  }, []);

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
