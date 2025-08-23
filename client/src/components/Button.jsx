export default function SubmitButton({ disabled, children, specClass }) {
  return (
    <button className={specClass} type="submit" disabled={disabled}>
      {children}
    </button>
  );
}
