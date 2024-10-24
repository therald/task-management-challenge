import { TaskList } from '@/components/task-list';
import { CreateTaskButton } from '@/components/create-task-button';
import { prisma } from '@/lib/db';

export default async function Home() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      dueDate: 'asc',
    },
  });

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Task Management</h1>
        <CreateTaskButton />
      </div>
      <TaskList initialTasks={tasks} />
    </main>
  );
}