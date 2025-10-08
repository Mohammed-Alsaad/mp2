import { Link } from "react-router-dom";
import { useSort } from "../../context/SortContext";
import { usePokemonList } from "../../hooks/usePokemonList";
import styles from "./ListView.module.css";

export default function ListView() {
  const { list, query, setQuery } = usePokemonList();
  const { sortKey, setSortKey, sortDir, setSortDir } = useSort();

  return (
    <main className={styles.container}>
      {/* Search and sorting toolbar */}
      <header className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Search Pokémon…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search Pokémon"
        />

        <div className={styles.sorts}>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
          >
            <option value="name">Name</option>
            <option value="id">Pokémon ID</option>
          </select>

          <button
            className={styles.sortButton}
            onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
          >
            {sortDir === "asc" ? "Asc" : "Desc"}
          </button>
        </div>
      </header>

      {/* Pokémon list */}
      <ul className={styles.list}>
        {list.map((p) => (
          <li key={p.name} className={styles.item}>
            <Link
              to={`/pokemon/${p.name}`}
              state={{ from: "list" }}
              className={styles.card}
            >
              <img src={p.sprites?.front_default ?? ""} alt={p.name} />
              <span className={styles.name}>{p.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
