import React, { useContext, useMemo } from "react";
import { BACKEND_URL } from "../../config";
import { UserDataContext } from "../../utils/UserDataContext";
import styles from "./Recommendation.module.css";

export default function Recommendation({
  poster,
  title,
  author,
  location,
  rating,
  friendid,
  children,
}: {
  poster: string;
  title: string;
  author: string;
  location: string;
  rating: number;
  friendid: number;
  children: React.ReactNode;
}) {
  const { userData, setUserData } = useContext(UserDataContext);

  const isAuthenticated = useMemo(() => {
    if (userData !== null) return true;
    const userDataLocalStorage = localStorage.getItem("data");
    if (userDataLocalStorage !== null) {
      setUserData(JSON.parse(userDataLocalStorage));
      return true;
    }
  }, []);
  return (
    <div className={styles.recommendation}>
      <div className={styles.poster} style={{ backgroundImage: `url(${poster})` }}></div>
      <div className={styles.details}>
        <div className={styles.titleAuthor}>
          <h2>{title}</h2>
          <span>&bull;</span>
          <p
            data-author={author}
            onClick={() => {
              if (!isAuthenticated) return;

              const userDataLocalStorage = localStorage.getItem("data") ?? "{}";
              const email = userData?.email ?? JSON.parse(userDataLocalStorage).email;

              fetch(BACKEND_URL + "/add-friend", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  friendid,
                }),
              })
                .then((response) => response.json())
                .then((response) => {
                  if (response.error) return;
                  alert(`Friend with id ${friendid} added!`);
                })
                .catch((error) => {
                  alert(error);
                });
            }}
            className={styles.author}
          ></p>
        </div>

        <div className={styles.detail}>
          <div className={styles.detailIcon} style={{ backgroundImage: `url("src/assets/icons/quote.svg")` }}></div>
          <p>{children}</p>
        </div>
        <div className={styles.detail}>
          <div className={styles.detailIcon} style={{ backgroundImage: `url("src/assets/icons/location.svg")` }}></div>
          <p>{location}</p>
        </div>
        <div className={styles.detail}>
          <div className={styles.detailIcon} style={{ backgroundImage: `url("src/assets/icons/rating.svg")` }}></div>
          <p>{rating} stars out of 5</p>
        </div>
      </div>
    </div>
  );
}
