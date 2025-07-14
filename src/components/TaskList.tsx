import React from "react";
import { TaskCard } from "./TaskCard";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask.tsx";

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

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onReorder: (updated: Task[]) => void;
}

export function TaskList({ tasks, onDeleteTask, onReorder }: TaskListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      const updated = arrayMove(tasks, oldIndex, newIndex);
      onReorder(updated);
    }
  };

  if (tasks.length === 0) {
    return <div className="text-center py-12 text-gray-500">No tasks yet</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {tasks.map((task) => (
            <SortableTask key={task.id} id={task.id}>
              <TaskCard task={task} onDelete={onDeleteTask} />
            </SortableTask>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
