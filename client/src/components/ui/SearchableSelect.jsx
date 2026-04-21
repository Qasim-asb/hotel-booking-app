import { Combobox } from '@headlessui/react'
import { useState, useMemo, memo } from 'react'

const SearchableSelect = ({ label, value, onChange, options, placeholder }) => {
  const [query, setQuery] = useState('')

  const filteredOptions = useMemo(() => {
    if (!query) return options.slice(0, 5)

    return options.filter(opt => opt.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
  }, [query, options])

  const selectedOption = options.find(opt => opt._id === value)

  return (
    <Combobox value={value} onChange={onChange}>
      <div className='relative'>
        <Combobox.Label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 inline-block'>{label}</Combobox.Label>

        <Combobox.Input displayValue={() => selectedOption?.title || ''} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} className='w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring focus:ring-primary-500 focus:border-primary-500' />

        <Combobox.Options className='absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg'>
          {filteredOptions.map(opt => (
            <Combobox.Option key={opt._id} value={opt._id} className='cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'>
              {opt.title}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}

export default memo(SearchableSelect)