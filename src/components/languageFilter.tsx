export default function LanguageFilter(): JSX.Element {
  const options = ["All", "C", "C++", "JavaScript", "Python", "SQL", "Text"];
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
