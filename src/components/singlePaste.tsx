import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import { contentInterface } from "../utils/contentInterface";
import {useParams} from 'react-router-dom'

interface Property {
    id: string
}

export function SinglePaste(): JSX.Element {
    const {id} = useParams();
    console.log(id)
    const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://pastebin-abdulsaj.herokuapp.com/"
      : "http://localhost:4000/";
  const requestUrl = `${baseUrl}`;

  const[paste,setPaste] = useState<contentInterface>()

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(requestUrl + id);
          const jsonBody: contentInterface[] = await response.json();
          console.log(jsonBody)
          setPaste(jsonBody[0])
          
        };
    
        fetchData();
      }, [requestUrl]);
    
    return (
        <p>{paste?.data}</p>
    )
}