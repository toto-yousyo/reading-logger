import { notFound } from "next/navigation";
import { getTaskById } from "@/lib/getters";
import TaskForm from "@/components/TaskForm";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await getTaskById(id);
  if (!task) notFound();

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl text-indigo-800 font-bold mb-4">タスク編集</h2>
      <TaskForm task={task} />
    </div>
  );
}
