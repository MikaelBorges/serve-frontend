function Button(props) {
  return (
    <button className='mx-2' onClick={(e) => props.toggleTheme(e.target.innerText)}>
      {props.text}
    </button>
  );
}

export default Button;
