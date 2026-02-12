import Link from "next/link";
import { getAllTasks } from "@/lib/getters";
import TaskItem from "@/components/TaskItem";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const allTasks = await getAllTasks();

  const priorityOrder: Record<string, number> = {
    high: 0,
    medium: 1,
    low: 2,
  };

  const filtered = allTasks
    .filter((t) => {
      if (filter === "completed") return t.status === "completed";
      if (filter === "active") return t.status !== "completed";
      return true;
    })
    .sort((a, b) => (priorityOrder[a.priority] ?? 1) - (priorityOrder[b.priority] ?? 1));

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl text-indigo-800 font-bold">タスク管理</h2>
        <Link
          href="/tasks/new"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500 no-underline"
        >
          新規作成
        </Link>
      </div>
      <div className="flex gap-2 mb-4">
        <Link
          href="/tasks"
          className={`px-3 py-1 rounded text-sm no-underline ${!filter ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          全て
        </Link>
        <Link
          href="/tasks?filter=active"
          className={`px-3 py-1 rounded text-sm no-underline ${filter === "active" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          未完了
        </Link>
        <Link
          href="/tasks?filter=completed"
          className={`px-3 py-1 rounded text-sm no-underline ${filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          完了済み
        </Link>
      </div>
      {filtered.length === 0 ? (
        <p className="text-gray-500">タスクがありません。</p>
      ) : (
        filtered.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
}
