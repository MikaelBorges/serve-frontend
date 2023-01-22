import styleOf from './FilterButton.module.scss'
import { useState } from 'react'

function FilterButton({filterButtonName, children, statusFilter}) {
  const [isFilterOpen, setIsFilterOpen] = useState(statusFilter)

  const handleClickFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <button
      className={`
        px-3
        mt-1.5
        border
        rounded-3xl
        border-solid
        border-black
        dark:border-white
        ${styleOf.filterButton}
      `}
      onClick={handleClickFilter}
    >
      {filterButtonName}
      <fieldset className={isFilterOpen ? 'inline-block' : 'hidden'}>
        {children}
      </fieldset>
    </button>
  )
}

export default FilterButton;
