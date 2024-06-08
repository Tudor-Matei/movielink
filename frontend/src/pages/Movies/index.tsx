import Header from "../../components/Header";
import Recommendation from "../../components/Recommendation";
import styles from "./Movies.module.css";

export default function Movies() {
  return (
    <>
      <Header />
      <div className={styles.movies}>
        <Recommendation
          poster="src/assets/landing.jpg"
          title="Inception"
          author="John Doe"
          location="Cinema City, Timiș, Timișoara"
          friendid={2}
          rating={4.7}
        >
          "Just watched 'Inception' – mind-blowing! The plot twists kept me on the edge of my seat, and the visuals were
          stunning. A must-see for sci-fi fans!"
        </Recommendation>
        <Recommendation
          poster="src/assets/landing.jpg"
          title="Inception"
          author="John Doe"
          location="Cinema City, Timiș, Timișoara"
          friendid={2}
          rating={4.7}
        >
          "Just watched 'Inception' – mind-blowing! The plot twists kept me on the edge of my seat, and the visuals were
          stunning. A must-see for sci-fi fans!"
        </Recommendation>
        <Recommendation
          poster="src/assets/landing.jpg"
          title="Inception"
          author="John Doe"
          location="Cinema City, Timiș, Timișoara"
          friendid={2}
          rating={4.7}
        >
          "Just watched 'Inception' – mind-blowing! The plot twists kept me on the edge of my seat, and the visuals were
          stunning. A must-see for sci-fi fans!"
        </Recommendation>
      </div>
    </>
  );
}
