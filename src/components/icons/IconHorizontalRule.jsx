// icon:horizontal-rule-16 | Octicons https://primer.style/octicons/ | Github Primer
function IconHorizontalRule(props) {
  return (
    <svg
      className="text-slate-300 relative top-1 dark:text-slate-600"
      viewBox="0 0 16 16"
      fill="currentColor"
      height="4rem"
      width="4rem"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M0 7.75A.75.75 0 01.75 7h14.5a.75.75 0 010 1.5H.75A.75.75 0 010 7.75z"
      />
    </svg>
  );
}

export default IconHorizontalRule;
