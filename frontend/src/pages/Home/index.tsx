import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Recommendation from "../../components/Recommendation";
import { UserDataContext } from "../../utils/UserDataContext";
import styles from "./Home.module.css";

export default function Home() {
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
    <>
      <Header />
      <section className={styles.landing}>
        <div className={styles.landingTextPart}>
          <h1>Get the best movies from us, or your friends</h1>
          {!isAuthenticated ? (
            <>
              <Link to="/signup">
                <button className="button--primary">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className={`button--secondary ${styles.logInButton}`}>Already have an account? Log in</button>
              </Link>
            </>
          ) : (
            <Link to="/movies">
              <button className="button--primary">See Movies</button>
            </Link>
          )}
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
            friendid={2}
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
            friendid={2}
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
            friendid={2}
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
