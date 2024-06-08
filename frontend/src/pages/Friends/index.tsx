import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { BACKEND_URL } from "../../config";
import { UserDataContext } from "../../utils/UserDataContext";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    const userDataLocalStorage = localStorage.getItem("data") ?? "{}";
    const email = userData?.email ?? JSON.parse(userDataLocalStorage).email;

    fetch(BACKEND_URL + "/get-friends", {
      credentials: "include",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        setFriends(response.data);
        console.log(response);
      })
      .catch(console.error);
  }, []);
  return (
    <>
      <Header />
      <div style={{ margin: "3rem" }}>
        {friends.length === 0
          ? "No friends found."
          : friends.map((friend) => (
              <div style={{ backgroundColor: "var(--accent-4)", padding: "1rem", borderRadius: "25px" }}>
                {friend.fname} {friend.lname} | {friend.email}
              </div>
            ))}
      </div>
    </>
  );
}
