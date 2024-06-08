import { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function Friends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <div style={{ margin: "3rem" }}>
        {friends.length === 0 ? "No friends found." : friends.map((friend) => <div>{friend}</div>)}
      </div>
    </>
  );
}
