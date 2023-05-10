import { useRef } from 'react'

function FilterInput(props) {
  const inputRef = useRef(null)

  /* useEffect(() => {
    inputRef.current.value = ''
    props.inputsReseted
  }, [props.resetfilter]); */

  //console.log('inputRef.current', inputRef.current)

  /* if(props.resetfilter === 'true') {
    console.log("props.resetfilter === 'true'")
    inputRef.current.value = ''
    props.inputsReseted
  } */

  return (
    <input
      ref={inputRef}
      //ref={props.locationinputref}
      // Tip : rounded-none and leading-4 to fix ui issues on ios devices
      className={`
        h-5
        ml-3
        bg-white
        leading-4
        border-b-2
        rounded-none
        border-slate-400
        dark:bg-slate-800
        ${props.type === 'text' ? 'w-20' : 'w-12'}
      `}
      {...props}
    />
  )
}

export default FilterInput
