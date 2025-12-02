import * as select from '@zag-js/select'
import { useMachine, normalizeProps, mergeProps, Portal } from '@zag-js/react'
import { useId } from 'react'
import { ChevronsUpDown, Check } from 'lucide-react'

interface Props {
  label: string
  data: { label: string; value: string }[]
  onValueChange: (value: string) => void
}

export function Select({ label, data, onValueChange: onValueChangeProp }: Props) {
  const service = useMachine(select.machine, {
    loopFocus: true,
    name: 'country',
    id: useId(),
    collection: select.collection({ items: data }),
    onValueChange(details) {
      const value = details.value.at(0)
      value && onValueChangeProp(value)
    },
  })

  const api = select.connect(service, normalizeProps)

  const controlProps = mergeProps(api.getControlProps())

  return (
    <form>
      {/* Hidden select */}
      <select {...api.getHiddenSelectProps()}>
        {data.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {/* Custom Select */}
      <div {...controlProps}>
        <label
          className="block text-xl/8 font-medium text-gray-900 dark:text-white"
          {...api.getLabelProps()}
        >
          {label}
        </label>
        <button
          className="grid min-w-[320px] cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:focus-visible:outline-indigo-500"
          type="button"
          {...api.getTriggerProps()}
        >
          <span className="col-start-1 row-start-1 truncate pr-6">
            {api.valueAsString || 'Select a workout'}
          </span>
          <ChevronsUpDown
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
          />
        </button>
      </div>
      <Portal>
        <div {...api.getPositionerProps()}>
          <ul
            className="mt-1 max-h-60 [width:min(var(--reference-width),var(--available-width))] overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 sm:text-sm dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            {...api.getContentProps()}
          >
            {data.map(item => (
              <li
                className="group flex items-center gap-x-2 relative data-highlighted:bg-green-600 dark:text-white cursor-default py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-green-600 hover:text-white"
                key={item.value}
                {...api.getItemProps({ item })}
              >
                <span>{item.label}</span>
                <span {...api.getItemIndicatorProps({ item })}>
                  <Check size="20" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Portal>
    </form>
  )
}
