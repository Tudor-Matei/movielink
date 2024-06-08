import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../utils/UserDataContext";
import styles from "./Header.module.css";

export default function Header() {
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
    <header className={styles.header}>
      <div className={styles.headerLogoPart}>
        <div className={styles.headerLogo}></div>
        <p>movielink</p>
      </div>
      <div>
        {!isAuthenticated ? (
          <Link to="/signup">
            <button className="button--primary">Sign Up</button>
          </Link>
        ) : (
          <>
            <Link to="/friends">
              <button className="button--primary">Friends</button>
            </Link>
            <Link to="/logout">
              <button className="button--primary" style={{ marginLeft: 20 }}>
                Log Out
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
