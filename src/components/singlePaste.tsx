import { useEffect } from "react";
import { useState } from "react";
import { contentInterface } from "../utils/contentInterface";
import { useParams } from "react-router-dom";
import { CommentData } from "./commentData";
import NavBar from "./NavBar";
import { editData } from "../utils/contentInterface";
import axios from "axios";

export function SinglePaste(): JSX.Element {
  const { id } = useParams();
  console.log(id);
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://pastebin-abdulsaj.herokuapp.com/"
      : "http://localhost:4000/";
  const requestUrl = `${baseUrl}`;

  let frontendURL: string;
  process.env.NODE_ENV === "production"
    ? (frontendURL = "https://incredible-kulfi-5ae6a9.netlify.app/")
    : (frontendURL = "http://localhost:3000/");

  const [paste, setPaste] = useState<contentInterface>();
  const [editID, setEditID] = useState<number>(-1);
  const [edit, setEdit] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(requestUrl + id);
      const jsonBody: contentInterface[] = await response.json();
      console.log(jsonBody);
      setPaste(jsonBody[0]);
    };

    fetchData();
  }, [requestUrl, id]);

  async function editData(editData: editData) {
    await axios.put(baseUrl, editData);
    window.location.href = frontendURL + paste?.id;
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

  async function deleteData(id: number) {
    await axios.delete(baseUrl + id.toString());
    window.location.href = frontendURL + "recent";
  }

  return (
    <>
      <NavBar />
      <div className="singlePaste">
        <h2>{paste?.title}</h2>
        <p>{paste?.data}</p>
        <div className="singleEditDelete">
          <button
            onClick={() => paste && deleteData(paste.id)}
            className="button10"
          >
            Delete
          </button>
          <button
            className="button10"
            onClick={() => {
              paste && handleEdit({ id: paste.id, edit: edit });
            }}
          >
            Edit
          </button>
          <input
            onChange={(e) => setEdit(e.target.value)}
            placeholder="Input your edit..."
            type={editID === paste?.id ? "text" : "hidden"}
            className=""
          ></input>
        </div>
        {paste && <CommentData content={paste} />}
      </div>
    </>
  );
}
