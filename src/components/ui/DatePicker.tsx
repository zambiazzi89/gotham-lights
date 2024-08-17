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

export function DatePicker({
  date,
  setDate,
}: {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal bg-white bg-opacity-80 hover:bg-white hover:bg-opacity-80',
              !date && 'text-black hover:text-black'
            )}
          >
            <CalendarIcon className="text-black mr-2 h-4 w-4" />
            {date ? (
              <div className="text-black">{format(date, 'PPP')}</div>
            ) : (
              <span>When?</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
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
