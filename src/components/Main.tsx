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
  }

  // async function deleteData(id: number) {
  //   await axios.delete(baseUrl + id.toString());
  // }

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
        <li key={x.id}>{x.name}</li>
      ))}
    </>
  );
}
