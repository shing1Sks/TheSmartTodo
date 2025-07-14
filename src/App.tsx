import React, { useEffect, useState } from "react";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { Brain } from "lucide-react";

interface Reminder {
  type: string;
  time: string;
}

interface Task {
  id: string;
  heading: string;
  task: string;
  subtasks: string[];
  reminder?: Reminder;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch tasks on page load
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Handle new prompt submission
  const handleTaskSubmit = async (input: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/parse-task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      if (data.success) {
        await fetchTasks(); // 🔄 Refresh tasks after update
      } else {
        console.error("Backend did not succeed:", data);
      }
    } catch (err) {
      console.error("Failed to submit task:", err);
    } finally {
      setLoading(false);
    }
  };

  // Optional local-only delete (backend delete endpoint is separate)
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <Brain className="text-blue-600 mr-2" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Smart Tasks</h1>
          </div>
          <p className="text-gray-600">
            AI-powered task organizer. Just describe what you need to do in
            natural language.
          </p>
        </div>

        {/* Input */}
        <TaskInput onSubmit={handleTaskSubmit} />

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center text-sm text-gray-500">
            Processing task with AI...
          </div>
        )}

        {/* Task List */}
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      </div>
    </div>
  );
}

export default App;
