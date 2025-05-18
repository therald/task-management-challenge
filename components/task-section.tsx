'use client'

import { Task, type Label } from '@/lib/db'
import { TaskList } from '@/components/task-list'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface ITaskSection {
  labels: Label[]
  tasks: Task[]
}

const taskFilteringSchema = z.object({
  labelFilters: z.array(z.string()).optional()
})

type TaskFilteringFormData = z.infer<typeof taskFilteringSchema>

export function TaskSection({ labels, tasks }: ITaskSection) {
  const { getValues, setValue } = useForm<TaskFilteringFormData>({
    resolver: zodResolver(taskFilteringSchema),
    defaultValues: {
      labelFilters: []
    }
  })

  const tasksWithLabels = tasks
    .filter(({ labels }) =>
      !getValues('labelFilters')?.length
        ? true
        : labels.filter(({ labelId }) =>
            getValues('labelFilters')?.includes(labelId)
          ).length
    )
    .map(({ labels: taskLabels, ...task }) => ({
      ...task,
      labels:
        taskLabels
          ?.map(({ labelId }) => labels.find(({ id }) => id === labelId))
          .filter(label => !!label) ?? []
    }))

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-bold'>Tasks</h2>
      <DropdownMenu>
        <DropdownMenuTrigger>Filter</DropdownMenuTrigger>
        <DropdownMenuContent>
          {labels.map(label => (
            <DropdownMenuCheckboxItem
              key={label.id}
              id={label.id}
              checked={getValues('labelFilters')?.includes(label.id)}
              onCheckedChange={() => {
                const currentLabels = getValues('labelFilters') ?? []

                const foundIndex = currentLabels.indexOf(label.id)
                if (foundIndex >= 0) {
                  currentLabels.splice(foundIndex, 1)
                } else {
                  currentLabels.push(label.id)
                }

                setValue('labelFilters', currentLabels, {
                  shouldDirty: true,
                  shouldValidate: true,
                  shouldTouch: true
                })
              }}
            >
              {label.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TaskList initialTasks={tasksWithLabels} />
    </div>
  )
}
