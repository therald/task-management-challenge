'use client'

import { useEffect, useState } from 'react'
import { TaskCard } from './task-card'
import { Label, Task } from '@/lib/db'

interface TaskListProps {
  initialTasks: (Omit<Task, 'labels'> & { labels: Label[] })[]
}

export function TaskList({ initialTasks }: TaskListProps) {
  const [tasks, setTasks] =
    useState<TaskListProps['initialTasks']>(initialTasks)

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </div>
  )
}
