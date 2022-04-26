export default function OptionsList(): JSX.Element {
  const options = ["C", "C++", "JavaScript", "Python", "SQL", "Text"];
  return (
    <>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </>
  );
}
