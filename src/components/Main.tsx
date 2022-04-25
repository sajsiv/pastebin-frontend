// import axios from "axios";
import contentInterface from "../utils/contentInterface";
import { useState } from "react";
import { useEffect } from "react";

export function Main(): JSX.Element {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://pastebin-abdulsaj.herokuapp.com/"
      : "http://localhost:4000";
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

  return (
    <>
      {content.map((x) => (
        <li key={x.id}>{x.name}</li>
      ))}
    </>
  );
}
