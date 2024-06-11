import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';

const TaskChart = () => {
  const [chartData, setChartData] = useState(null); // Initialize with null

  useEffect(() => {
    const fetchData = async () => {
      try {
        setChartData({
          labels: ['Total Tasks', 'Completed Tasks'],
          datasets: [
            {
              label: 'Tasks',
              data: [4, 0],
              backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(192,75,75,0.4)'],
              borderColor: ['rgba(75,192,192,1)', 'rgba(192,75,75,1)'],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Task Analytics</h2>
      {chartData ? <Bar data={chartData} /> : <p>Loading...</p>} {/* Conditional rendering */}
    </div>
  );
};

export default TaskChart;
