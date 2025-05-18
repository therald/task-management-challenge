'use client';

import { Task, type Label } from '@/lib/db'
import { TaskList } from '@/components/task-list';

interface ITaskSection {
  labels: Label[]
  tasks: Task[]
}

export function TaskSection({ labels, tasks }: ITaskSection) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className="text-3xl font-bold">Tasks</h2>
      <TaskList initialTasks={tasks} labels={labels} />
    </div>
  )
}
