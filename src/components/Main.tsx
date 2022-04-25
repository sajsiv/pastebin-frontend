import axios from "axios";
import { contentInterface, pastedData } from "../utils/contentInterface";
import { useState } from "react";
import { useEffect } from "react";
import sortByDate from "../utils/sortChronologically";

export function Main(): JSX.Element {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://pastebin-abdulsaj.herokuapp.com/"
      : "http://localhost:4000/";
  const requestUrl = `${baseUrl}`;

  const [content, setContent] = useState<contentInterface[]>([]);
  let frontendURL:string;
  process.env.NODE_ENV === "production"?frontendURL="https://incredible-kulfi-5ae6a9.netlify.app/":frontendURL="http://localhost:3000/"
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(requestUrl);
      const jsonBody: contentInterface[] = await response.json();
      setContent(jsonBody.sort((a, b) => sortByDate(a, b)));
    };
    fetchData();
  }, [requestUrl]);

  async function postData(pastedData: pastedData) {
    await axios.post(baseUrl, pastedData);
    window.location.href = frontendURL;
  }

  async function deleteData(id: number) {
    await axios.delete(baseUrl + id.toString());
    window.location.href = frontendURL;
  }

  const [inputData, setInputData] = useState("");
  const [inputTitle, setInputTitle] = useState("");

  return (
    <>
      <input
        onChange={(e) => setInputTitle(e.target.value)}
        placeholder="add title"
      ></input>
      <br/>
      <textarea
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Paste in here!"
      ></textarea>
      <br/>
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
      {content
        
        .map((x) => (
          <div key={x.id}>
            <h4>{x.title}</h4>
            <li key={x.id}>
              {x.data}
              
              <button onClick={() => deleteData(x.id)} key={x.id}>
                Delete
              </button>
              <hr />
            </li>
          </div>
        ))}
    </>
  );
}
