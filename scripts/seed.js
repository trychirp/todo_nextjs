import Task from '../models/Task';
import dbConnect from '../utils/dbConnect';

const createSampleData = async () => {
  await dbConnect();

  // Clear existing data
  await Task.deleteMany({});

  const now = new Date();
  const dayInMillis = 24 * 60 * 60 * 1000;

  const sampleTasks = [
    {
      task: 'Task 1',
      completed: true,
      priority: 'High',
      due_date: new Date(now.getTime() + 2 * dayInMillis), // Future due date
      created_at: new Date(now.getTime() - 5 * dayInMillis),
      completed_at: new Date(now.getTime() - 4 * dayInMillis),
      order: 0,
    },
    {
      task: 'Task 2',
      completed: true,
      priority: 'Medium',
      due_date: new Date(now.getTime() - 1 * dayInMillis), // Expiring due date (yesterday)
      created_at: new Date(now.getTime() - 5 * dayInMillis),
      completed_at: new Date(now.getTime() - 2 * dayInMillis),
      order: 1,
    },
    {
      task: 'Task 3',
      completed: false,
      priority: 'Low',
      due_date: new Date(now.getTime() - 3 * dayInMillis), // Expiring due date (3 days ago)
      created_at: new Date(now.getTime() - 4 * dayInMillis),
      completed_at: null,
      order: 2,
    },
    {
      task: 'Task 4',
      completed: true,
      priority: 'High',
      due_date: new Date(now.getTime() + 5 * dayInMillis), // Future due date
      created_at: new Date(now.getTime() - 6 * dayInMillis),
      completed_at: new Date(now.getTime() - 4 * dayInMillis),
      order: 3,
    },
    {
      task: 'Task 5',
      completed: false,
      priority: 'Medium',
      due_date: null, // No due date
      created_at: new Date(now.getTime() - 4 * dayInMillis),
      completed_at: null,
      order: 4,
    },
    {
      task: 'Task 6',
      completed: true,
      priority: 'Low',
      due_date: null, // No due date
      created_at: new Date(now.getTime() - 6 * dayInMillis),
      completed_at: new Date(now.getTime() - 5 * dayInMillis),
      order: 5,
    },
    {
      task: 'Task 7',
      completed: true,
      priority: 'Medium',
      due_date: new Date(now.getTime() - 2 * dayInMillis), // Expiring due date (2 days ago)
      created_at: new Date(now.getTime() - 4 * dayInMillis),
      completed_at: new Date(now.getTime() - 1 * dayInMillis),
      order: 6,
    },
    {
      task: 'Task 8',
      completed: false,
      priority: 'High',
      due_date: new Date(now.getTime() + 7 * dayInMillis), // Future due date
      created_at: new Date(now.getTime() - 3 * dayInMillis),
      completed_at: null,
      order: 7,
    },
    {
      task: 'Task 9',
      completed: true,
      priority: 'Low',
      due_date: new Date(now.getTime() - 4 * dayInMillis), // Expiring due date (4 days ago)
      created_at: new Date(now.getTime() - 5 * dayInMillis),
      completed_at: new Date(now.getTime() - 2 * dayInMillis),
      order: 8,
    },
    {
      task: 'Task 10',
      completed: false,
      priority: 'Medium',
      due_date: new Date(now.getTime() + 10 * dayInMillis), // Future due date
      created_at: new Date(now.getTime() - 2 * dayInMillis),
      completed_at: null,
      order: 9,
    }
  ];

  await Task.insertMany(sampleTasks);
  console.log('Sample data created successfully');
};

createSampleData().catch((err) => {
  console.error('Error creating sample data:', err);
});
