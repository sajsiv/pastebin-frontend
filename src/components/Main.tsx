import axios from "axios";
import { contentInterface, pastedData } from "../utils/contentInterface";
import { useState } from "react";
import { useEffect } from "react";

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

  async function postData(pastedData: pastedData) {
    if (pastedData.data === "") {
      window.alert("You must include body text");
      return;
    }
    await axios.post(baseUrl, pastedData);
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
          })
        }
      >
        Post your paste!
      </button>
      {content.map((x) => (
        <div key={x.id}>
          <h4>{x.title}</h4>
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
          <hr />
        </div>
      ))}
    </>
  );
}
