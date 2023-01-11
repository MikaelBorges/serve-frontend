function FilterCheckbox({checkboxName, groupName}) {

  const handleClickCheckbox = (e) => {
    e.stopPropagation()
  }

  return (
    <label
      htmlFor={checkboxName}
      className='ml-3 cursor-pointer'
      onClick={(e) => handleClickCheckbox(e)}
    >
      <input
        type='checkbox'
        name={groupName}
        id={checkboxName}
        className='cursor-pointer'
      />
      {checkboxName}
    </label>
  )
}

export default FilterCheckbox;
