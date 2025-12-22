import { cx } from 'class-variance-authority'

export const cxLabel = cx(
  'block',
  'text-xl/8 font-medium text-gray-900',
  'dark:text-white'
)

export const cxTrigger = cx(
  'grid grid-cols-1',
  'min-w-[320px] rounded-md outline-1 -outline-offset-1 outline-gray-300',
  'py-1.5 pr-2 pl-3',
  'bg-white',
  'cursor-default',
  'text-left text-gray-900 sm:text-sm/6',
  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600',
  'dark:bg-white/5 dark:text-white dark:outline-white/10 dark:focus-visible:outline-indigo-500'
)

export const cxList = cx(
  'overflow-auto',
  'mt-1 max-h-60 [width:min(var(--reference-width),var(--available-width))] rounded-md shadow-lg outline-1 outline-black/5',
  'py-1',
  'bg-white',
  'text-base sm:text-sm',
  'dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'
)

export const cxListItem = cx(
  'group',
  'relative',
  'flex items-center gap-x-2',
  'py-2 pr-9 pl-3',
  'cursor-default select-none',
  'text-gray-900',
  'hover:bg-green-600 hover:text-white data-highlighted:bg-green-600',
  'dark:text-white'
)
