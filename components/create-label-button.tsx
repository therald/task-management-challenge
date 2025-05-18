'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusCircle } from 'lucide-react'

const labelSchema = z.object({
  title: z.string().min(1, 'Title is required')
})

type LabelFormData = z.infer<typeof labelSchema>

export function CreateLabelButton() {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LabelFormData>({
    resolver: zodResolver(labelSchema)
  })

  const onSubmit = async (data: LabelFormData) => {
    try {
      const response = await fetch('/api/labels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to create label')
      }

      reset()
      setOpen(false)
      window.location.reload()
    } catch (error) {
      console.error('Error creating label:', error)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className='mr-2 h-4 w-4' />
          Create Label
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Label</DialogTitle>
          <DialogDescription>Enter your new label below.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <div>
            <Label htmlFor='title'>Label</Label>
            <Input
              id='title'
              {...register('title')}
            />
            {errors.title && (
              <p className='text-red-500 text-sm'>{errors.title.message}</p>
            )}
          </div>
          <Button
            type='submit'
            className='w-full'
          >
            Create Label
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
