import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/lib/db';

interface LabelCardProps {
  label: Label;
}

export function LabelCard({ label }: LabelCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{label.title}</CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}