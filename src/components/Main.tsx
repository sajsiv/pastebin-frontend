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

  const frontendURL = "https://incredible-kulfi-5ae6a9.netlify.app/";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(requestUrl);
      const jsonBody: contentInterface[] = await response.json();
      setContent(jsonBody);
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

  const [input, setInput] = useState("");

  return (
    <>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste in here!"
      ></input>
      <button onClick={() => postData({ name: input })}>
        Post your paste!
      </button>
      {content.map((x) => (
        <div key={x.id}>
          <li key={x.id}>
            {x.name}
            <button onClick={() => deleteData(x.id)} key={x.id}>
              Delete
            </button>
          </li>
        </div>
      ))}
    </>
  );
}
