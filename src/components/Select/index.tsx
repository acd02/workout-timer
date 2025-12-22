import { Portal, mergeProps, normalizeProps, useMachine } from '@zag-js/react'
import * as select from '@zag-js/select'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useId } from 'react'

import { cxLabel, cxList, cxListItem, cxTrigger } from './styles'

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
      if (value) onValueChangeProp(value)
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
        <label className={cxLabel} {...api.getLabelProps()}>
          {label}
        </label>
        <button className={cxTrigger} type="button" {...api.getTriggerProps()}>
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
          <ul className={cxList} {...api.getContentProps()}>
            {data.map(item => (
              <li className={cxListItem} key={item.value} {...api.getItemProps({ item })}>
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
