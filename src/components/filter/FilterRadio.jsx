function FilterRadio({radioName, groupName, checked, handleChangeRadio}) {

  return (
    <label
      className='ml-3 cursor-pointer'
      onClick={(e) => e.stopPropagation()}
      htmlFor={`${groupName}-${radioName}`}
    >
      <input
        type='radio'
        name={groupName}
        value={radioName}
        className='cursor-pointer'
        id={`${groupName}-${radioName}`}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => handleChangeRadio(e)}
        defaultChecked={checked === radioName ? 'checked' : ''}
      />
      {radioName}
    </label>
  )
}

export default FilterRadio
