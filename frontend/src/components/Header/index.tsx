import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header({ isAuthenticated = false }: { isAuthenticated: boolean }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogoPart}>
        <div className={styles.headerLogo}></div>
        <p>movielink</p>
      </div>
      <div>
        {!isAuthenticated && (
          <Link to="/signup">
            <button className="button--primary">Sign Up</button>
          </Link>
        )}
        <button className={styles.headerHamburgerButton}></button>
      </div>
    </header>
  );
}
