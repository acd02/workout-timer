import { cva } from 'class-variance-authority'

export const buttonGroup = cva(
  'cursor-pointer disabled:cursor-not-allowed disabled:opacity-75',
  {
    variants: {
      isActive: {
        true: ['inset-ring-3'],
      },
      part: {
        wrapper: ['isolate inline-flex rounded-md shadow-xs dark:shadow-none'],
        start: [
          'relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-2xl font-semibold text-gray-900 inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 focus:z-10 dark:bg-white/10 dark:text-white dark:inset-ring-gray-700 dark:hover:bg-white/20',
        ],
        middle: [
          'relative -ml-px inline-flex items-center bg-white px-3 py-2 text-2xl font-semibold text-gray-900 inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 focus:z-10 dark:bg-white/10 dark:text-white dark:inset-ring-gray-700 dark:hover:bg-white/20',
        ],
        end: [
          'relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-2xl font-semibold text-gray-900 inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 focus:z-10 dark:bg-white/10 dark:text-white dark:inset-ring-gray-700 dark:hover:bg-white/20',
        ],
      },
    },
  }
)
