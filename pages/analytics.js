import Link from 'next/link';
import TaskChart from '../components/TaskChart';
import dbConnect from '../utils/dbConnect';
import styles from "../styles/Home.module.css";
import Task from '../models/Task';

export default function Analytics() {
  return (
		<main className={styles.main}>
			<h1 className={styles.heading}>Task Analytics</h1>
      <TaskChart />
      <Link href='/'>
          <a className={styles.analytics_link}>Back</a>
        </Link>
    </main>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const tasks = await Task.find({});
  return { props: { tasks: JSON.parse(JSON.stringify(tasks)) } };
}
