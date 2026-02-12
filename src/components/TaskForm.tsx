import type { TaskFormProps } from "@/lib/types";
import { addTask, updateTask } from "@/lib/actions";

export default function TaskForm({ task }: TaskFormProps) {
  const action = task ? updateTask : addTask;
  const dueDate = task?.dueDate
    ? new Date(task.dueDate).toISOString().split("T")[0]
    : "";

  return (
    <form action={action}>
      {task && <input type="hidden" name="id" defaultValue={task.id} />}
      <div className="mb-3">
        <label className="font-bold" htmlFor="title">
          タイトル：
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="block w-full bg-gray-100 border-2 border-gray-600 rounded px-2 py-1 focus:bg-white focus:outline-none focus:border-red-500"
          defaultValue={task?.title ?? ""}
        />
      </div>
      <div className="mb-3">
        <label className="font-bold" htmlFor="description">
          詳細メモ：
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="block w-full bg-gray-100 border-2 border-gray-600 rounded px-2 py-1 focus:bg-white focus:outline-none focus:border-red-500"
          defaultValue={task?.description ?? ""}
        />
      </div>
      <div className="mb-3">
        <label className="font-bold" htmlFor="priority">
          優先度：
        </label>
        <select
          id="priority"
          name="priority"
          className="block bg-gray-100 border-2 border-gray-600 rounded px-2 py-1 focus:bg-white focus:outline-none focus:border-red-500"
          defaultValue={task?.priority ?? "medium"}
        >
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="font-bold" htmlFor="category">
          カテゴリ：
        </label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="読書, 感想, 購入 など"
          className="block bg-gray-100 border-2 border-gray-600 rounded px-2 py-1 focus:bg-white focus:outline-none focus:border-red-500"
          defaultValue={task?.category ?? ""}
        />
      </div>
      <div className="mb-3">
        <label className="font-bold" htmlFor="dueDate">
          期限：
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          className="block bg-gray-100 border-2 border-gray-600 rounded px-2 py-1 focus:bg-white focus:outline-none focus:border-red-500"
          defaultValue={dueDate}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500"
      >
        {task ? "更新" : "作成"}
      </button>
    </form>
  );
}
