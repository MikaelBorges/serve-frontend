import styleOf from './FilterButton.module.scss'

function FilterButton({filterButtonName, children}) {

  return (
    <div
      className={`
        px-3
        flex
        mt-1.5
        border
        flex-wrap
        rounded-3xl
        items-center
        border-solid
        border-black
        dark:border-white
        ${styleOf.filterButton}
    `}
    >
      {filterButtonName &&
      <span>
        {filterButtonName}
      </span>
      }
      <fieldset className='inline-block'>
        {children}
      </fieldset>
    </div>
  )
}


export default FilterButton
