export default function LanguageFilter(): JSX.Element {
  const options = ["All", "C", "C++", "JavaScript", "Python", "SQL", "Text"];
  return (
    <>
      <option value="" disabled selected>
        Select language
      </option>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </>
  );
}
