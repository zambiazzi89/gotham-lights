'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CancelButtonWithDialog } from '@/components/AlertDialog'
import { DatePicker } from '@/components/ui/DatePicker'
import { Textarea } from '@/components/ui/textarea'
import { addSignal } from '../_actions/signalActions'

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: 'Your signal title length must be between 5 and 70 characters.',
    })
    .max(70, {
      message: 'Your signal title length must be between 5 and 70 characters.',
    }),
  date: z.date(),
  content: z
    .string()
    .min(5, {
      message:
        'Your signal content length must be between 5 and 400 characters.',
    })
    .max(400, {
      message:
        'Your signal content length must be between 5 and 400 characters.',
    }),
})

export default function CreateSignalForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  return (
    <Form {...form}>
      <form
        action={addSignal}
        className="w-[32rem] max-w-[80dvw] bg-secondary p-4 rounded shadow-md"
      >
        <div className="font-semibold text-lg mb-3">Create a Signal</div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="my-2">
              <FormControl>
                <Input
                  placeholder="Name your signal"
                  type="text"
                  id="title"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="my-2">
              <input
                type="hidden"
                name={field.name}
                value={field.value?.toISOString()}
              />
              <DatePicker field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="my-2">
              <Textarea placeholder="What do you want to share?" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between w-full mt-8">
          <CancelButtonWithDialog href="/signals" />
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  )
}
