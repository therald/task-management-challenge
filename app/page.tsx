import { TaskList } from '@/components/task-list'
import { CreateTaskButton } from '@/components/create-task-button'
import { CreateLabelButton } from '@/components/create-label-button'
import { LabelList } from '@/components/label-list'
import { LabelSection } from '@/components/label-section'
import { TaskSection } from '@/components/task-section'

async function getTasks() {
  const res = await fetch('http://localhost:3000/api/tasks', {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch tasks')
  }

  return res.json()
}

async function getLabels() {
  const res = await fetch('http://localhost:3000/api/labels', {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch labels')
  }

  return res.json()
}

export default async function Home() {
  const tasks = await getTasks()
  const labels = await getLabels()

  return (
    <main className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold'>Task Management</h1>
        <CreateTaskButton labels={labels} />
        <CreateLabelButton />
      </div>
      <div className='flex flex-col gap-12'>
        <TaskSection
          labels={labels}
          tasks={tasks}
        />
        <LabelSection labels={labels} />
      </div>
    </main>
  )
}
