import axios from "axios";
import { contentInterface, pastedData } from "../utils/contentInterface";
import { useState } from "react";
import { useEffect } from "react";
import OptionsList from "./optionslist";
import checkExpiry from "../utils/checkExpiry";
import deleteExpired from "../utils/DeleteExpired";
import NavBar from "./NavBar";

export function Main(): JSX.Element {
  const [inputData, setInputData] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [language, setLanguage] = useState("C");
  const [expiry, setExpiry] = useState<string>("");

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
      setContent(await deleteExpired(jsonBody, requestUrl));
    };
    fetchData();
  }, [requestUrl, inputData]);

  const currentDate = new Date(Date.now());
  async function postData(pastedData: pastedData) {
    if (pastedData.data === "") {
      window.alert("You must include body text");
    } else if (checkExpiry(pastedData.expiryDate, currentDate)) {
      window.alert("Please enter a valid expiry date");
    } else {
      await axios.post(baseUrl, pastedData);
      window.location.href = frontendURL + (content[0].id + 1);
    }
  }

  return (
    <>
      <NavBar />
      <div className="mainbox">
        <input
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="add title"
          className="titleInput"
        ></input>
        <br />
        <textarea
          autoFocus
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Paste in here!"
          rows={22}
          cols={140}
          className="pasteInput"
        ></textarea>
        <br />
        <button
          onClick={() =>
            postData({
              title: inputTitle,
              data: inputData,
              creationDate: new Date(Date.now()),
              language: language,
              expiryDate: expiry,
            })
          }
          className="button10"
        >
          Post your paste!
        </button>
        <input type="date" onChange={(e) => setExpiry(e.target.value)}></input>

        <select onChange={(e) => setLanguage(e.target.value)}>
          <OptionsList />
        </select>
      </div>
    </>
  );
}
