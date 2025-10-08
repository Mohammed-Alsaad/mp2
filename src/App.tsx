import { Link, Outlet } from "react-router-dom";
import styles from "./App.module.css"; // import the CSS module

export default function App() {
  return (
    <div>
      {/* Navigation Header */}
      <header className={styles.nav}>
        <Link to="/list" className={styles.link}>
          List
        </Link>
        <Link to="/gallery" className={styles.link}>
          Gallery
        </Link>
      </header>

      {/* Active page (List, Gallery, or Detail) */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
