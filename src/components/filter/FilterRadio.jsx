function FilterRadio({radioName, groupName, handleChangeRadio, isParamOnUrl}) {
//function FilterRadio({radioName, groupName, handleChangeRadio, ...props}) {

  return (
    <label
      className='[&:not(:last-child)]:mr-3 cursor-pointer'
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
        defaultChecked={
          isParamOnUrl && radioName === 'oui' ||
          !isParamOnUrl && radioName === 'non'}
        //{...props}
      />
      {radioName}
    </label>
  )
}

export default FilterRadio
