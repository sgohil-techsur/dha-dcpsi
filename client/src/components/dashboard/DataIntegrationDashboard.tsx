import React, { useEffect, useState } from "react";

interface DataIntegrationTask {
  id: number;
  taskName: string;
  status: string;
  startTime?: string;
  endTime?: string;
  lastUpdated?: string;
}

const DataIntegrationDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<DataIntegrationTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/data-integration/tasks")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data: DataIntegrationTask[]) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Data Integration Tasks Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.taskName}</td>
              <td>{task.status}</td>
              <td>{task.startTime ?? "-"}</td>
              <td>{task.endTime ?? "-"}</td>
              <td>{task.lastUpdated ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataIntegrationDashboard;
