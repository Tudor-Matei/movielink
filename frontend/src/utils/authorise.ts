import { BACKEND_URL } from "../config";
import AuthorisationResponse from "./AuthorisationResponse";

export default function authorise(): Promise<AuthorisationResponse> {
  return fetch(BACKEND_URL + "/auth", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch(() => ({ error: "Error trying to authorise", data: false }));
}
