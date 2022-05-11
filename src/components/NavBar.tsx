export default function NavBar(): JSX.Element {
  let frontendURL: string;
  process.env.NODE_ENV === "production"
    ? (frontendURL = "https://incredible-kulfi-5ae6a9.netlify.app/")
    : (frontendURL = "http://localhost:3000/");

  return (
    <>
      <nav className="navbar">
        <a href={frontendURL}>
          <button className="button-9">🗑️🗑️🗑️ PasteBin 🗑️🗑️🗑️</button>
        </a>
        <a href={frontendURL + "recent"}>
          <button className="button-9">See Recent Pastes</button>
        </a>
      </nav>
    </>
  );
}
