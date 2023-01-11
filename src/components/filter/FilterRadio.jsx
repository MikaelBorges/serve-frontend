function FilterRadio({radioName, groupName}) {

  const handleClickRadio = (e) => {
    console.log('first')
    e.stopPropagation()
  }

  return (
    <label
      htmlFor={radioName}
      className='ml-3 cursor-pointer'
      onClick={(e) => handleClickRadio(e)}
    >
      <input
        type='radio'
        id={radioName}
        name={groupName}
        className='cursor-pointer'
      />
      {radioName}
    </label>
  )
}

export default FilterRadio;
