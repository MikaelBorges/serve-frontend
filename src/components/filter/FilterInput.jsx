function FilterInput({placeholder, handleChangeInput, type}) {

  const handleClickInput = (e) => {
    e.stopPropagation()
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      onClick={(e) => handleClickInput(e)}
      onChange={(e) => handleChangeInput(e)}
      name={placeholder}
      className={`
        h-5
        w-20
        ml-3
        border-b-2
        bg-slate-100
        border-slate-400
        dark:bg-slate-800
      `}
    />
  )
}

export default FilterInput;
