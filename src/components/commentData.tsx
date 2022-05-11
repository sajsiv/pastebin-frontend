import { Comment } from "../utils/commentInterface";
import { PasteComment } from "../utils/commentInterface";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { contentInterface } from "../utils/contentInterface";
interface Properties {
  content: contentInterface;
}

export function CommentData(props: Properties): JSX.Element {
  const [comments, setComments] = useState<Comment[]>();
  const [post, setPost] = useState<PasteComment>({ comment: "" });
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://pastebin-abdulsaj.herokuapp.com/"
      : "http://localhost:4000/";
  const requestUrl = `${baseUrl}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(requestUrl + props.content.id + "/comments");
      const jsonBody: Comment[] = await response.json();
      setComments(jsonBody);
    };
    fetchData();
  }, [requestUrl, props.content.id]); //might not work

  let frontendURL: string;
  process.env.NODE_ENV === "production"
    ? (frontendURL = "https://incredible-kulfi-5ae6a9.netlify.app/")
    : (frontendURL = "http://localhost:3000/");

  const postComment = async (postCommentData: PasteComment) => {
    await axios.post(
      requestUrl + props.content.id + "/comments",
      postCommentData
    );
    window.location.href = frontendURL + props.content.id;
  };

  const deleteComment = async (commentid: number) => {
    await axios.delete(
      requestUrl + props.content.id + "/comments/" + commentid
    );
    window.location.href = frontendURL + props.content.id;
  };
  return (
    <>
      <h4>Comments</h4>
      <input
        onChange={(e) => setPost({ comment: e.target.value })}
        className="commentInput"
      ></input>
      <button
        className="button10"
        onClick={() =>
          post.comment !== ""
            ? postComment(post)
            : window.alert("empty comment not allowed")
        }
      >
        post comment
      </button>
      {comments?.map((x) => (
        <li key={x.commentid}>
          {x.comment}{" "}
          <button
            onClick={() => deleteComment(x.commentid)}
            className="button10"
          >
            delete
          </button>
        </li>
      ))}
    </>
  );
}
