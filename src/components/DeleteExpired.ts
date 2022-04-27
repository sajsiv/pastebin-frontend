import axios from "axios";
import checkExpiry from "../utils/checkExpiry";
import { contentInterface } from "../utils/contentInterface";

export default async function deleteExpired(
  pasteData: contentInterface[],
  baseURL: string
): Promise<contentInterface[]> {
  for (const paste of pasteData) {
    if (checkExpiry(paste.expiryDate, new Date(Date.now()))) {
      await axios.delete(baseURL + paste.id);
    }
  }
  const response = await fetch(baseURL + "sorted");
  const jsonBody: contentInterface[] = await response.json();
  return jsonBody;
}
