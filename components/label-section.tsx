'use client';

import { type Label } from '@/lib/db'
import { LabelList } from '@/components/label-list';

interface ILabelSection {
  labels: Label[]
}

export function LabelSection({ labels }: ILabelSection) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className="text-3xl font-bold">Labels</h2>
      <LabelList initialLabels={labels} />
    </div>
  )
}
