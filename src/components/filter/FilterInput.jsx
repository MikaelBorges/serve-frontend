function FilterInput(props) {

  return (
    <input
      className={`
        h-5
        ml-3
        border-b-2
        bg-white
        border-slate-400
        dark:bg-slate-800
        ${props.type === 'text' ? 'w-20' : 'w-12'}
      `}
      {...props}
    />
  )
}

export default FilterInput
