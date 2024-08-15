'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ControllerRenderProps } from 'react-hook-form'

export function DatePicker({
  field,
}: {
  field: ControllerRenderProps<
    {
      title: string
      date: Date
      content: string
    },
    'date'
  >
}) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal bg-white bg-opacity-80 hover:bg-white hover:bg-opacity-80',
              !field.value && 'text-black hover:text-black'
            )}
          >
            <CalendarIcon className="text-black mr-2 h-4 w-4" />
            {field.value ? (
              <div className="text-black">{format(field.value, 'PPP')}</div>
            ) : (
              <span>When?</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) =>
              date > new Date() || date < new Date('1920-01-01')
            }
            initialFocus
            required
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
