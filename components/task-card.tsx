import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label, Task } from '@/lib/db';

const priorityColors = {
  LOW: 'bg-blue-100 text-blue-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800',
} as const;

const statusColors = {
  TODO: 'bg-gray-100 text-gray-800',
  IN_PROGRESS: 'bg-purple-100 text-purple-800',
  DONE: 'bg-green-100 text-green-800',
} as const;

interface TaskCardProps {
  task: Task
  labels: Label[]
}

export function TaskCard({ task, labels }: TaskCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{task.title}</CardTitle>
          <Badge variant="outline" className={priorityColors[task.priority as keyof typeof priorityColors]}>
            {task.priority}
          </Badge>
        </div>
        <CardDescription>
          {task.dueDate && (
            <span className="text-sm text-gray-500">
              Due: {format(new Date(task.dueDate), 'PPP')}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <Badge className={statusColors[task.status as keyof typeof statusColors]}>{task.status}</Badge>

        <div className='mt-2'>
          {
            task.labels.length
              ? (
                `Labels: ${labels.filter(label => (task.labels ?? []).map(taskLabel => taskLabel.labelId).includes(label.id)).map(({title}) => title).join(', ')}`
              ) : null
            }
        </div>
      </CardContent>
    </Card>
  );
}