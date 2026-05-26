import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add task
  const addTask = async () => {
    if (!title) return;

    try {
      await axios.post("http://localhost:5000/tasks", {
        title,
      });

      setTitle("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle task
  const toggleTask = async (id) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Statistics
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  // Filter Logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "pending") {
      return !task.completed;
    }

    return true;
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        padding: "40px",
        fontFamily: "Arial",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "40px",
        }}
      >
        Project Management Dashboard
      </h1>

      {/* Input Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
          }}
        />

        <button
          onClick={addTask}
          style={{
            padding: "12px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
            textAlign: "center",
          }}
        >
          <h2>Total Tasks</h2>
          <p style={{ fontSize: "30px" }}>
            {tasks.length}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
            textAlign: "center",
          }}
        >
          <h2>Completed</h2>
          <p
            style={{
              fontSize: "30px",
              color: "#22c55e",
            }}
          >
            {completedTasks}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
            textAlign: "center",
          }}
        >
          <h2>Pending</h2>
          <p
            style={{
              fontSize: "30px",
              color: "#f59e0b",
            }}
          >
            {pendingTasks}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          All
        </button>

        <button
          onClick={() => setFilter("completed")}
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("pending")}
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Pending
        </button>
      </div>

      {/* Tasks */}
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            style={{
              backgroundColor: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
                color: task.completed
                  ? "#94a3b8"
                  : "white",
              }}
            >
              {task.title}
            </span>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => toggleTask(task.id)}
                style={{
                  padding: "8px 12px",
                  backgroundColor: task.completed
                    ? "#f59e0b"
                    : "#22c55e",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {task.completed
                  ? "Undo"
                  : "Complete"}
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#ef4444",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;