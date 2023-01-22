function FilterCheckbox({checkboxName, groupName}) {

  const handleClickCheckbox = (e) => {
    e.stopPropagation()
    console.warn('clic on checkbox')
  }

  return (
    <label
      className='ml-3 cursor-pointer'
      onClick={(e) => e.stopPropagation()}
      htmlFor={`${groupName}-${checkboxName}`}
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
