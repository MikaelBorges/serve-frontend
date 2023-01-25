import styleOf from './FilterButton.module.scss'
import { useState } from 'react'

function FilterButton({filterButtonName, children}) {

  return (
    <div
      className={`
        px-3
        flex
        mt-1.5
        border
        rounded-3xl
        items-center
        border-solid
        border-black
        dark:border-white
        ${styleOf.filterButton}
    `}
    >
      <span>
        {filterButtonName}
      </span>
      <fieldset className='inline-block'>
        {children}
      </fieldset>
    </div>
  )
}


export default FilterButton
