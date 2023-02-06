function FilterCheckbox({checkboxName, groupName}) {

  const handleClickCheckbox = (e) => {
    e.stopPropagation()
    console.warn('clic on checkbox')
  }

  return (
    <label
      onClick={(e) => e.stopPropagation()}
      htmlFor={`${groupName}-${checkboxName}`}
      className='[&:not(:last-child)]:mr-3 cursor-pointer'
    >
      <input
        type='checkbox'
        name={groupName}
        className='cursor-pointer'
        id={`${groupName}-${checkboxName}`}
        onClick={(e) => handleClickCheckbox(e)}
      />
      {checkboxName}
    </label>
  )
}

export default FilterCheckbox;
