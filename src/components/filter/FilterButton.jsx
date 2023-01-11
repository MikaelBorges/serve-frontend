import styleOf from './FilterButton.module.scss'
import { useState } from 'react'

function FilterButton({filterButtonName, children}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleClickFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <button
      className={`
        px-3
        mt-1.5
        ml-1.5
        border
        last:mr-0
        rounded-3xl
        border-solid
        border-black
        dark:border-white
        ${styleOf.filterButton}
      `}
      onClick={handleClickFilter}
    >
      {filterButtonName}
      <div className={isFilterOpen ? 'inline-block' : 'hidden'}>
        <fieldset>
          {children}
        </fieldset>
      </div>
    </button>
  )
}

export default FilterButton;
