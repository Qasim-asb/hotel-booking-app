import React, { memo } from 'react'
import { Listbox } from '@headlessui/react'

const Select = ({ label, value, onChange, options, placeholder, getValue = (opt) => opt.value, getLabel = (opt) => opt.label }) => {
  const selectedOption = options.find(opt => getValue(opt) === value)

  return (
    <Listbox value={value} onChange={onChange}>
      <div className='relative'>
        <Listbox.Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 inline-block'>{label}</Listbox.Label>

        <Listbox.Button className={`w-full px-3 py-2 border rounded-md shadow-sm text-left border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring focus:ring-primary-500 focus:border-primary-500 ${value === null || value === '' ? 'text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
          {selectedOption ? getLabel(selectedOption) : placeholder}
        </Listbox.Button>

        <Listbox.Options className='absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg focus:outline-none'>
          {options.map(opt => (
            <Listbox.Option key={getValue(opt)} value={getValue(opt)} className={({ active }) => `cursor-pointer px-3 py-2 ${active ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
              {getLabel(opt)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}

export default memo(Select)