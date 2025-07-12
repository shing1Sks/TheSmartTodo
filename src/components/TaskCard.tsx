import React from 'react';
import { Trash2 } from 'lucide-react';

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

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 relative">
      <button
        onClick={() => onDelete(task.id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
      
      <h3 className="font-bold text-gray-900 text-lg mb-2 pr-8">
        {task.heading}
      </h3>
      
      <p className="text-gray-700 mb-3 leading-relaxed">
        {task.task}
      </p>
      
      {task.subtasks.length > 0 && (
        <ul className="list-disc list-inside text-gray-600 mb-3 space-y-1">
          {task.subtasks.map((subtask, index) => (
            <li key={index} className="text-sm">
              {subtask}
            </li>
          ))}
        </ul>
      )}
      
      {task.reminder && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
          {task.reminder.type} • {task.reminder.time}
        </div>
      )}
    </div>
  );
}