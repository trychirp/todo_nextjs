import Link from 'next/link';
import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "../styles/Home.module.css";

const url = "http://localhost:3000/api/task";

const defaultTask = { task: "", priority: "Low", due_date: "" };

export default function Home(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [task, setTask] = useState(defaultTask);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setTask((prev) => ({ ...prev, [input.name]: input.value }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'yellow';
      case 'Low':
        return 'green';
      default:
        return 'green';
    }
  };

  const PriorityCircle = ({ priority }) => {
    const color = getPriorityColor(priority);
    return <div style={{ backgroundColor: color, width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px' }}></div>;
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      if (task._id) {
        const { data } = await axios.put(url + "/" + task._id, {
          task: task.task,
          priority: task.priority,
          due_date: task.due_date || null,
        });
        const originalTasks = [...tasks];
        const index = originalTasks.findIndex((t) => t._id === task._id);
        originalTasks[index] = data.data;
        setTasks(originalTasks);
        setTask(defaultTask);
        console.log(data.message);
      } else {
        const { data } = await axios.post(url, {
          task: task.task,
          priority: task.priority,
          due_date: task.due_date || null,
        });
        setTasks((prev) => [...prev, data.data]);
        setTask(defaultTask);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (id) => {
    const currentTask = tasks.filter((task) => task._id === id);
    if (currentTask.length > 0) {
      const { _id, task, priority, due_date } = currentTask[0];
      const formattedDueDate = due_date ? new Date(due_date).toISOString().split('T')[0] : "";
      setTask({
        _id,
        task,
        priority,
        due_date: formattedDueDate
      });
    }
  };

  const updateTask = async (id) => {
    try {
      const originalTasks = [...tasks];
      const index = originalTasks.findIndex((t) => t._id === id);
      const { data } = await axios.put(url + "/" + id, {
        completed: !originalTasks[index].completed,
      });
      originalTasks[index] = data.data;
      setTasks(originalTasks);
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(url + "/" + id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const isOverdue = (due_date) => {
    if (!due_date) return false;
    const now = new Date();
    const dueDate = new Date(due_date);
    return now > dueDate;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    setTasks(reorderedTasks);

    try {
      await axios.put(url, { tasks: reorderedTasks });
      console.log("Tasks reordered successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>TO-DO</h1>
      <div className={styles.container}>
        <form onSubmit={addTask} className={styles.form_container}>
          <input
            className={styles.input}
            type="text"
            name="task"
            placeholder="Task to be done..."
            onChange={handleChange}
            value={task.task}
          />
          <select
            className={styles.select}
            name="priority"
            onChange={handleChange}
            value={task.priority}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            className={styles.input}
            type="date"
            name="due_date"
            onChange={handleChange}
            value={task.due_date}
          />
          <button type="submit" className={styles.submit_btn}>
            {task._id ? "Update" : "Add"}
          </button>
        </form>
        {isMounted && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className={styles.task_list}>
                  {tasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          className={styles.task_container}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className={styles.task_content}>
                            <input
                              type="checkbox"
                              className={styles.check_box}
                              checked={task.completed}
                              onChange={() => updateTask(task._id)}
                            />
                            <p
                              className={
                                task.completed
                                  ? styles.task_text + " " + styles.line_through
                                  : styles.task_text
                              }
                            >
                              {task.task}
                            </p>
                            {task.due_date && (
                              <p
                                className={
                                  isOverdue(task.due_date)
                                    ? styles.task_due_date + " " + styles.overdue
                                    : styles.task_due_date
                                }
                              >
                                {formatDate(task.due_date)}
                              </p>
                            )}
                            <PriorityCircle priority={task.priority} />
                          </div>
                          <div className={styles.task_actions}>
                            <button
                              onClick={() => editTask(task._id)}
                              className={styles.edit_task}
                            >
                              &#9998;
                            </button>
                            <button
                              onClick={() => deleteTask(task._id)}
                              className={styles.remove_task}
                            >
                              &#10006;
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
        {tasks.length === 0 && <h2 className={styles.no_tasks}>No tasks</h2>}
        <Link href='/analytics'>
          <a className={styles.analytics_link}>View Analytics</a>
        </Link>
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(url);
  return {
    props: {
      tasks: data.data,
    },
  };
};
