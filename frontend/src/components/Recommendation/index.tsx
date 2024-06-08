import React from "react";
import styles from "./Recommendation.module.css";

export default function Recommendation({
  poster,
  title,
  author,
  location,
  rating,
  children,
}: {
  poster: string;
  title: string;
  author: string;
  location: string;
  rating: number;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.recommendation}>
      <div className={styles.poster} style={{ backgroundImage: `url(${poster})` }}></div>
      <div className={styles.details}>
        <div className={styles.titleAuthor}>
          <h2>{title}</h2>
          <span>&bull;</span>
          <p data-author={author} className={styles.author}></p>
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
