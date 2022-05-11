import LanguageFilter from "./languageFilter";
import { useState, useEffect } from "react";
import { contentInterface } from "../utils/contentInterface";
import deleteExpired from "../utils/DeleteExpired";
import axios from "axios";
import { editData } from "../utils/contentInterface";
import NavBar from "./NavBar";

export default function RecentPastes(): JSX.Element {
  // setting backendURL value for local and production deployment
  const backendURL =
    process.env.NODE_ENV === "production"
      ? "https://pastebin-abdulsaj.herokuapp.com/"
      : "http://localhost:4000/";
  const backendRequestURL = `${backendURL}`;

  // setting frontendURL value for local and production deployment
  let frontendURL: string;
  process.env.NODE_ENV === "production"
    ? (frontendURL = "https://incredible-kulfi-5ae6a9.netlify.app/")
    : (frontendURL = "http://localhost:3000/");

  // fetching sorted pastes
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(backendRequestURL + "sorted");
      const jsonBody: contentInterface[] = await response.json();
      setContent(await deleteExpired(jsonBody, backendRequestURL));
    };

    fetchData();
  }, [backendRequestURL]);

  // useStates

  const [content, setContent] = useState<contentInterface[]>([]);
  const [summary, setSummary] = useState<number[]>([]);
  const [edit, setEdit] = useState<string>("");
  const [editID, setEditID] = useState<number>(-1);

  // click handlers
  function summaryHandler(id: number) {
    if (summary.includes(id)) {
      setSummary(summary.filter((x) => x !== id));
    } else {
      setSummary([...summary, id]);
    }
  }

  // fetches
  async function filterAllData(event: string) {
    const response = await fetch(backendRequestURL);
    const jsonBody: contentInterface[] = await response.json();
    setContent(
      event === "All" ? jsonBody : jsonBody.filter((x) => x.language === event)
    );
    console.log(content);
  }

  //backend

  async function editData(editData: editData) {
    await axios.put(backendURL, editData);
    window.location.href = frontendURL + "recent";
  }

  async function deleteData(id: number) {
    await axios.delete(backendURL + id.toString());
    window.location.href = frontendURL + "recent";
  }

  function setSummarisedClass(id: number) {
    let summarisedClass = "";
    if (summary.includes(id)) {
      summarisedClass = "summarisedPaste";
    } else {
      summarisedClass = "pasteBox";
    }
    return summarisedClass;
  }

  function handleEdit(x: editData) {
    return (
      edit !== ""
        ? (editData({
            id: x.id,
            edit: edit,
          }),
          setEditID(-1))
        : setEditID(x.id),
      editID >= 0 ? setEditID(-1) : 0
    );
  }

  return (
    <>
      <NavBar />
      <select
        className="textFormat input title"
        onChange={(e) => filterAllData(e.target.value.toString())}
        defaultValue="Select Language"
      >
        <LanguageFilter />
      </select>

      {content.map((x) => (
        <div key={x.id} className="pasteElement textFormat">
          <h3 className="title">{x.title}</h3>
          <i>Language: {x.language}</i>
          <br />
          <i>Paste URL: </i>
          <a href={frontendURL + x.id}>
            <i>{frontendURL + x.id}</i>
          </a>
          <p
            className={setSummarisedClass(x.id)}
            onClick={() => summaryHandler(x.id)}
          >
            {x.data}
          </p>
          <button className="button-9" onClick={() => deleteData(x.id)}>
            Delete
          </button>
          <button
            className="button-9"
            onClick={() => {
              handleEdit({ id: x.id, edit: edit });
            }}
          >
            Edit
          </button>

          <input
            className="pasteInput input"
            onChange={(e) => setEdit(e.target.value)}
            placeholder="Input your edit..."
            type={editID === x.id ? "text" : "hidden"}
          ></input>
          <br />
        </div>
      ))}
    </>
  );
}
