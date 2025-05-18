'use client'

import { useEffect, useState } from 'react'
import { Label } from '@/lib/db'
import { LabelCard } from './label-card'

interface LabelListProps {
  initialLabels: Label[]
}

export function LabelList({ initialLabels }: LabelListProps) {
  const [labels, setLabels] = useState<Label[]>(initialLabels)

  useEffect(() => {
    setLabels(initialLabels)
  }, [initialLabels])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {labels.map(label => (
        <LabelCard
          key={label.id}
          label={label}
        />
      ))}
    </div>
  )
}
