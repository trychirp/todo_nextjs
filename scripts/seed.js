import Task from '../models/Task';
import dbConnect from '../utils/dbConnect';

const createSampleData = async () => {
  await dbConnect();

  // Clear existing data
  await Task.deleteMany({});

  const sampleTasks = [
    {
      task: 'Task 1',
      completed: true,
      priority: 'High',
      created_at: new Date('2024-06-01T10:00:00Z'),
      completed_at: new Date('2024-06-02T15:00:00Z'),
    },
    {
      task: 'Task 2',
      completed: true,
      priority: 'Medium',
      created_at: new Date('2024-06-01T11:00:00Z'),
      completed_at: new Date('2024-06-03T09:00:00Z'),
    },
    {
      task: 'Task 3',
      completed: false,
      priority: 'Low',
      created_at: new Date('2024-06-02T14:00:00Z'),
      completed_at: null,
    },
    {
      task: 'Task 4',
      completed: true,
      priority: 'High',
      created_at: new Date('2024-06-03T09:00:00Z'),
      completed_at: new Date('2024-06-04T12:00:00Z'),
    },
    {
      task: 'Task 5',
      completed: false,
      priority: 'Medium',
      created_at: new Date('2024-06-03T11:00:00Z'),
      completed_at: null,
    },
    {
      task: 'Task 6',
      completed: true,
      priority: 'Low',
      created_at: new Date('2024-06-04T08:00:00Z'),
      completed_at: new Date('2024-06-05T16:00:00Z'),
    },
    {
      task: 'Task 7',
      completed: true,
      priority: 'Medium',
      created_at: new Date('2024-06-04T14:00:00Z'),
      completed_at: new Date('2024-06-06T10:00:00Z'),
    },
    {
      task: 'Task 8',
      completed: false,
      priority: 'High',
      created_at: new Date('2024-06-05T09:00:00Z'),
      completed_at: null,
    },
    {
      task: 'Task 9',
      completed: true,
      priority: 'Low',
      created_at: new Date('2024-06-05T11:00:00Z'),
      completed_at: new Date('2024-06-07T13:00:00Z'),
    },
    {
      task: 'Task 10',
      completed: false,
      priority: 'Medium',
      created_at: new Date('2024-06-06T10:00:00Z'),
      completed_at: null,
    }
  ];

  await Task.insertMany(sampleTasks);
  console.log('Sample data created successfully');
};

createSampleData().catch((err) => {
  console.error('Error creating sample data:', err);
});
