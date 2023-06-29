import Section from '../UI/Section';
import TaskItem from './TaskItem';
import classes from './Tasks.module.css';

const Tasks = (props) => {
  let taskList = <h2>No tasks found. Start adding some!</h2>;

  if (props.items.length > 0) {
    console.log(props.items)
    taskList = (
      <ul>
        {props.items.map((task) => (
          <TaskItem key={task.id}>{[task.text, <br key={task.id + 15} />, task.age || 21]}</TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = 'Loading tasks...';
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default Tasks;
