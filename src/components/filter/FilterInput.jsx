function FilterInput({placeholder, handleChangeInput, type}) {

  const handleClickInput = (e) => {
    e.stopPropagation()
    console.warn('clic on input')
  }

  return (
    <input
      type={type}
      name={placeholder}
      placeholder={placeholder}
      onClick={(e) => handleClickInput(e)}
      onChange={(e) => handleChangeInput(e)}
      className={`
        h-5
        ml-3
        border-b-2
        bg-white
        border-slate-400
        dark:bg-slate-800
        ${type === 'text' ? 'w-20' : 'w-12'}
      `}
    />
  )
}

export default FilterInput;
