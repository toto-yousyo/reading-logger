import TaskForm from "@/components/TaskForm";

export default function NewTaskPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl text-indigo-800 font-bold mb-4">タスク新規作成</h2>
      <TaskForm />
    </div>
  );
}
