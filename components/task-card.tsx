import { format } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Label, Task } from '@/lib/db'

const priorityColors = {
  LOW: 'bg-blue-100 text-blue-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800'
} as const

const statusColors = {
  TODO: 'bg-gray-100 text-gray-800',
  IN_PROGRESS: 'bg-purple-100 text-purple-800',
  DONE: 'bg-green-100 text-green-800'
} as const

interface TaskCardProps {
  isSkeleton?: boolean
  task: Task
  labels: Array<Label>
}

export function TaskCard({ isSkeleton, task, labels }: TaskCardProps) {
  const taskLabelIds = task.labels?.map(label => label.labelId)

  const taskLabels = labels.filter(label => taskLabelIds?.includes(label.id))

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <CardTitle className='text-xl'>
            {isSkeleton ? <Skeleton /> : task.title}
          </CardTitle>
          <Badge
            variant='outline'
            className={
              isSkeleton
                ? ''
                : priorityColors[task.priority as keyof typeof priorityColors]
            }
          >
            {isSkeleton ? <Skeleton /> : task.priority}
          </Badge>
        </div>
        <CardDescription>
          {isSkeleton ? (
            <Skeleton />
          ) : (
            task.dueDate && (
              <span className='text-sm text-gray-500'>
                Due: {format(new Date(task.dueDate), 'PPP')}
              </span>
            )
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-gray-600 mb-4'>
          {isSkeleton ? <Skeleton /> : task.description}
        </p>
        <Badge
          className={statusColors[task.status as keyof typeof statusColors]}
        >
          {isSkeleton ? <Skeleton /> : task.status}
        </Badge>

        {isSkeleton ? (
          <Skeleton />
        ) : taskLabels.length ? (
          <div className='mt-2'>
            {`Labels: ${taskLabels.map(label => label.title).join(', ')}`}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
