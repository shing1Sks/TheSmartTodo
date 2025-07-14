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

type FilterType = "all" | "weekly" | "once";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");

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

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // ✅ Filter tasks by reminder type
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.reminder?.type === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
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

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          {["all", "weekly", "once"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as FilterType)}
              className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors
                ${
                  filter === f
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {f === "all"
                ? "All Tasks"
                : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-sm text-gray-500 mb-4">
            Processing task with AI...
          </div>
        )}

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onReorder={setTasks}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
