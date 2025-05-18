'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label as TLabel } from '@/lib/db'
import { PlusCircle } from 'lucide-react';

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'] as const;
const STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'] as const;

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(PRIORITIES),
  status: z.enum(STATUSES),
  dueDate: z.string().optional(),
  labels: z.array(z.string()).optional()
});

type TaskFormData = z.infer<typeof taskSchema>;

interface ICreateTaskButton {
  labels: TLabel[]
}

export function CreateTaskButton({ labels }: ICreateTaskButton) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: 'MEDIUM',
      status: 'TODO',
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    if (data.dueDate) {
      const date = new Date(data.dueDate)

      date.setTime(date.getTime() + (date.getTimezoneOffset() * 60 * 1000))
      
      data.dueDate = date.toUTCString()
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      reset();
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Enter the details for your new task below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register('title')} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...register('description')} />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              onValueChange={(value) =>
                register('priority').onChange({
                  target: { value, name: 'priority' },
                })
              }
              defaultValue="MEDIUM"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {PRIORITIES.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input type="date" id="dueDate" {...register('dueDate')} />
          </div>
          <div>
            {/* <Label htmlFor="labels">Labels</Label> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                Labels
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {
                  labels.map(label => (
                    <DropdownMenuCheckboxItem 
                      key={label.id} 
                      id={label.id}
                      checked={getValues('labels')?.includes(label.id)}
                      onCheckedChange={() => {
                        const currentLabels = getValues('labels') ?? []

                        const foundIndex = currentLabels.indexOf(label.id)
                        if (foundIndex >= 0) {
                          currentLabels.splice(foundIndex, 1)
                        }
                        else {
                          currentLabels.push(label.id)
                        }

                        setValue('labels', currentLabels, { shouldDirty: true, shouldValidate: true, shouldTouch: true })
                      }}
                    >
                      {label.title}
                    </DropdownMenuCheckboxItem>
                  ))
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button type="submit" className="w-full">
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}