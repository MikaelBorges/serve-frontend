function FilterRadio({radioName, groupName}) {

  const handleClickRadio = (e) => {
    e.stopPropagation()
    console.log('clic on radio')
  }

  return (
    <label
      className='ml-3 cursor-pointer'
      onClick={(e) => e.stopPropagation()}
      htmlFor={`${groupName}-${radioName}`}
    >
      <input
        type='radio'
        name={groupName}
        className='cursor-pointer'
        id={`${groupName}-${radioName}`}
        onClick={(e) => handleClickRadio(e)}
      />
      {radioName}
    </label>
  )
}

export default FilterRadio;
