import { useState } from "react";
import Link from 'next/link';
import TaskChart from '../components/TaskChart';
import { Bar } from 'react-chartjs-2';
import dbConnect from '../utils/dbConnect';
import styles from "../styles/Analytics.module.css";
import Task from '../models/Task';

export default function Analytics({ createdVsCompletedData, priorityData, priorityCreatedData }) {
  return (
		<main className={styles.main}>
			<h1 className={styles.heading}>Task Analytics</h1>
      <div className={styles.chartContainer}>
        <h2>Created vs Completed Tasks by Day</h2>
        <Bar data={createdVsCompletedData} />
      </div>
      <div className={styles.chartContainer}>
        <h2>Tasks by Priority and Completion Status</h2>
        <Bar data={priorityData} />
      </div>
      <div className={styles.chartContainer}>
        <h2>Tasks Created by Priority and Date</h2>
        <Bar data={priorityCreatedData} />
      </div>
      <Link href='/'>
        <a className={styles.analytics_link}>Back</a>
      </Link>
    </main>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const tasks = await Task.find();
  const taskData = JSON.parse(JSON.stringify(tasks));

  const createdCount = {};
  const completedCount = {};
  const priorityCount = {
    High: { completed: 0, notCompleted: 0 },
    Medium: { completed: 0, notCompleted: 0 },
    Low: { completed: 0, notCompleted: 0 },
  };

  const priorityCreatedCount = {
    High: {},
    Medium: {},
    Low: {},
  };

  taskData.forEach(task => {
    const createdDate = new Date(task.created_at).toLocaleDateString();
    createdCount[createdDate] = (createdCount[createdDate] || 0) + 1;

    if (task.completed) {
      const completedDate = new Date(task.completed_at).toLocaleDateString();
      completedCount[completedDate] = (completedCount[completedDate] || 0) + 1;
    }

    if (task.completed) {
      priorityCount[task.priority].completed += 1;
    } else {
      priorityCount[task.priority].notCompleted += 1;
    }

    if (task.priority) {
      priorityCreatedCount[task.priority][createdDate] = (priorityCreatedCount[task.priority][createdDate] || 0) + 1;
    }
  });

  const dates = Array.from(new Set([...Object.keys(createdCount), ...Object.keys(completedCount)])).sort();
  const createdData = dates.map(date => createdCount[date] || 0);
  const completedData = dates.map(date => completedCount[date] || 0);

  const createdVsCompletedData = {
    labels: dates,
    datasets: [
      {
        label: 'Tasks Created',
        data: createdData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Tasks Completed',
        data: completedData,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Completed',
        data: [priorityCount.High.completed, priorityCount.Medium.completed, priorityCount.Low.completed],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Not Completed',
        data: [priorityCount.High.notCompleted, priorityCount.Medium.notCompleted, priorityCount.Low.notCompleted],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const priorityCreatedData = {
    labels: dates,
    datasets: [
      {
        label: 'High Priority',
        data: dates.map(date => priorityCreatedCount.High[date] || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Medium Priority',
        data: dates.map(date => priorityCreatedCount.Medium[date] || 0),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Low Priority',
        data: dates.map(date => priorityCreatedCount.Low[date] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return { props: { createdVsCompletedData, priorityData, priorityCreatedData } };
}
