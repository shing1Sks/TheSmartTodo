import React, { useState } from 'react';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { Brain } from 'lucide-react';

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

// Sample data to demonstrate the UI structure
const sampleTasks: Task[] = [
  {
    id: '1',
    heading: 'Call Mom',
    task: 'Call and catch up with mom',
    subtasks: [],
    reminder: {
      type: 'weekly',
      time: 'Sunday at 9:00 AM'
    }
  },
  {
    id: '2',
    heading: 'Project Planning',
    task: 'Plan the quarterly project roadmap and deliverables',
    subtasks: [
      'Review last quarter\'s performance',
      'Set new goals and milestones',
      'Schedule team meeting',
      'Prepare presentation slides'
    ],
    reminder: {
      type: 'one-time',
      time: 'Tomorrow at 2:00 PM'
    }
  },
  {
    id: '3',
    heading: 'Grocery Shopping',
    task: 'Buy groceries for the week',
    subtasks: [
      'Milk and eggs',
      'Fresh vegetables',
      'Bread and pasta'
    ]
  }
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  const handleTaskSubmit = (input: string) => {
    // TODO: In the future, this will send the input to an AI backend
    // For now, we'll just create a simple task placeholder
    const newTask: Task = {
      id: Date.now().toString(),
      heading: 'New Task',
      task: input,
      subtasks: []
    };
    
    setTasks(prev => [newTask, ...prev]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
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
            AI-powered task organizer. Just describe what you need to do in natural language.
          </p>
        </div>

        {/* Task Input */}
        <TaskInput onSubmit={handleTaskSubmit} />

        {/* Task List */}
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      </div>
    </div>
  );
}

export default App;