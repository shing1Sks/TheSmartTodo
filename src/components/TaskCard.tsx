import { Trash2 } from "lucide-react";

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

interface Props {
  task: Task;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onDelete }: Props) {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {task.heading}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{task.task}</p>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-400 hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {task.subtasks?.length > 0 && (
        <ul className="mt-3 list-disc list-inside text-sm text-gray-700 space-y-1">
          {task.subtasks.map((subtask, idx) => (
            <li key={idx}>{subtask}</li>
          ))}
        </ul>
      )}

      {task.reminder && (
        <div
          className="mt-3 inline-flex items-center px-2 py-1 text-xs font-medium rounded-full
                  bg-blue-50 text-blue-700 border border-blue-200 w-fit"
        >
          ⏰ {task.reminder.type.toUpperCase()} — {task.reminder.time}
        </div>
      )}
    </div>
  );
}
