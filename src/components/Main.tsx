import axios from "axios";
import {
  contentInterface,
  editData,
  pastedData,
} from "../utils/contentInterface";
import { useState } from "react";
import { useEffect } from "react";
import OptionsList from "./optionslist";
import LanguageFilter from "./languageFilter";

export function Main(): JSX.Element {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://pastebin-abdulsaj.herokuapp.com/"
      : "http://localhost:4000/";
  const requestUrl = `${baseUrl}`;

  const [content, setContent] = useState<contentInterface[]>([]);
  let frontendURL: string;
  process.env.NODE_ENV === "production"
    ? (frontendURL = "https://incredible-kulfi-5ae6a9.netlify.app/")
    : (frontendURL = "http://localhost:3000/");

  // fetching sorted pastes
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(requestUrl + "sorted");
      const jsonBody: contentInterface[] = await response.json();
      setContent(jsonBody);
    };
    fetchData();
  }, [requestUrl]);

  const [summary, setSummary] = useState<number[]>([]);

  function summaryHandler(id: number) {
    if (summary.includes(id)) {
      setSummary(summary.filter((x) => x !== id));
    } else {
      setSummary([...summary, id]);
    }
  }

  async function filterAllData(event: string) {
    const response = await fetch(requestUrl);
    const jsonBody: contentInterface[] = await response.json();
    setContent(
      event === "All" ? jsonBody : jsonBody.filter((x) => x.language === event)
    );
  }

  async function postData(pastedData: pastedData) {
    if (pastedData.data === "") {
      window.alert("You must include body text");
      return;
    }
    await axios.post(baseUrl, pastedData);
    window.location.href = frontendURL;
  }

  async function editData(editData: editData) {
    await axios.put(baseUrl, editData);
    window.location.href = frontendURL;
  }

  async function deleteData(id: number) {
    await axios.delete(baseUrl + id.toString());
    window.location.href = frontendURL;
  }

  const [inputData, setInputData] = useState("");
  const [inputTitle, setInputTitle] = useState("");

  function setSummarisedClass(id: number) {
    let summarisedClass = "";
    if (summary.includes(id)) {
      summarisedClass = "summarisedPaste";
    } else {
      summarisedClass = "pasteBox";
    }
    return summarisedClass;
  }

  const [language, setLanguage] = useState("C");
  const [edit, setEdit] = useState<string>("");
  const [editID, setEditID] = useState<number>(-1);

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
      <input
        onChange={(e) => setInputTitle(e.target.value)}
        placeholder="add title"
      ></input>
      <br />
      <textarea
        autoFocus
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Paste in here!"
        rows={32}
        cols={200}
      ></textarea>
      <br />
      <button
        onClick={() =>
          postData({
            title: inputTitle,
            data: inputData,
            creationDate: new Date(Date.now()),
            language: language,
          })
        }
      >
        Post your paste!
      </button>
      <select onChange={(e) => setLanguage(e.target.value)}>
        <OptionsList />
      </select>
      <select onChange={(e) => filterAllData(e.target.value.toString())}>
        <LanguageFilter />
      </select>
      {content.map((x) => (
        <div key={x.id}>
          <h4>{x.title}</h4>
          <i>Language: {x.language}</i>
          <p
            key={x.id}
            className={setSummarisedClass(x.id)}
            onClick={() => summaryHandler(x.id)}
          >
            {x.data}
          </p>
          <button onClick={() => deleteData(x.id)} key={x.id}>
            Delete
          </button>
          <button
            onClick={() => {
              handleEdit({ id: x.id, edit: edit });
            }}
            key={x.id}
          >
            Edit
          </button>
          <input
            onChange={(e) => setEdit(e.target.value)}
            placeholder="Input your edit..."
            type={editID === x.id ? "text" : "hidden"}
            key={x.id}
          ></input>
          <hr />
        </div>
      ))}
    </>
  );
}
