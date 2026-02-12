import Link from "next/link";
import type { Task } from "@/lib/types";
import { toggleTaskStatus, removeTask } from "@/lib/actions";

const priorityBadge: Record<string, string> = {
  high: "bg-red-500 text-white",
  medium: "bg-yellow-500 text-white",
  low: "bg-green-500 text-white",
};

const priorityLabel: Record<string, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

export default function TaskItem({ task }: { task: Task }) {
  const isCompleted = task.status === "completed";
  const overdue =
    !isCompleted && task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`border rounded p-3 mb-2 flex items-center justify-between ${isCompleted ? "bg-gray-100 opacity-60" : "bg-white"}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <form action={toggleTaskStatus}>
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="status" value={task.status} />
          <button
            type="submit"
            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isCompleted ? "bg-blue-600 border-blue-600 text-white" : "border-gray-400"}`}
          >
            {isCompleted && "✓"}
          </button>
        </form>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-semibold ${isCompleted ? "line-through text-gray-400" : ""}`}
            >
              {task.title}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded ${priorityBadge[task.priority] ?? priorityBadge.medium}`}
            >
              {priorityLabel[task.priority] ?? "中"}
            </span>
            {task.category && (
              <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                {task.category}
              </span>
            )}
          </div>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1 truncate">
              {task.description}
            </p>
          )}
          {task.dueDate && (
            <p
              className={`text-xs mt-1 ${overdue ? "text-red-600 font-bold" : "text-gray-400"}`}
            >
              期限: {new Date(task.dueDate).toLocaleDateString("ja-JP")}
              {overdue && " (期限切れ)"}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2 ml-2 shrink-0">
        <Link
          href={`/tasks/${task.id}/edit`}
          className="text-sm bg-gray-200 rounded px-3 py-1 hover:bg-gray-300"
        >
          編集
        </Link>
        <form action={removeTask}>
          <input type="hidden" name="id" value={task.id} />
          <button
            type="submit"
            className="text-sm bg-red-600 text-white rounded px-3 py-1 hover:bg-red-500"
          >
            削除
          </button>
        </form>
      </div>
    </div>
  );
}
