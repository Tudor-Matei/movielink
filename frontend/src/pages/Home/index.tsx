import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Recommendation from "../../components/Recommendation";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <Header isAuthenticated={false} />
      <section className={styles.landing}>
        <div className={styles.landingTextPart}>
          <h1>Get the best movies from us, or your friends</h1>
          <Link to="/signup">
            <button className="button--primary">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className={`button--secondary ${styles.logInButton}`}>Already have an account? Log in</button>
          </Link>
        </div>
        <div className={styles.landingImage}></div>
      </section>
      <div className={styles.recommendationsList}>
        <h1>Get a taste for yourself</h1>
        <div className={styles.recommendations}>
          <Recommendation
            poster="src/assets/landing.jpg"
            title="Inception"
            author="John Doe"
            location="Cinema City, Timiș, Timișoara"
            rating={4.7}
          >
            "Just watched 'Inception' – mind-blowing! The plot twists kept me on the edge of my seat, and the visuals
            were stunning. A must-see for sci-fi fans!"
          </Recommendation>
          <Recommendation
            poster="src/assets/landing.jpg"
            title="Inception"
            author="John Doe"
            location="Cinema City, Timiș, Timișoara"
            rating={4.7}
          >
            "Just watched 'Inception' – mind-blowing! The plot twists kept me on the edge of my seat, and the visuals
            were stunning. A must-see for sci-fi fans!"
          </Recommendation>
          <Recommendation
            poster="src/assets/landing.jpg"
            title="Inception"
            author="John Doe"
            location="Cinema City, Timiș, Timișoara"
            rating={4.7}
          >
            "Just watched 'Inception' – mind-blowing! The plot twists kept me on the edge of my seat, and the visuals
            were stunning. A must-see for sci-fi fans!"
          </Recommendation>
        </div>
      </div>
    </>
  );
}
