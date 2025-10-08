import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSort } from "../../context/SortContext";
import { usePokemonList } from "../../hooks/usePokemonList";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import styles from "./DetailView.module.css";

export default function DetailView() {
  const { name = "" } = useParams();
  const { data } = usePokemonDetail(name);
  const { list } = usePokemonList();
  const { sortKey, sortDir } = useSort();
  const nav = useNavigate();
  const location = useLocation();

  // Detect where the user came from
  const from = (location.state as { from?: string })?.from || "list";
  const galleryList = (location.state as { galleryList?: string[] })?.galleryList;

  // Determine which list to use for navigation
  let navList: string[] = [];

  if (from === "gallery" && galleryList && galleryList.length > 0) {
    // Use the filtered gallery subset if available
    navList = galleryList;
  } else {
    // Otherwise use globally sorted Pokémon list
    navList = [...list]
      .sort((a, b) => {
        const aVal = sortKey === "name" ? a.name : a.id;
        const bVal = sortKey === "name" ? b.name : b.id;
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      })
      .map((p) => p.name);
  }

  // Find previous and next Pokémon based on selected list
  const idx = navList.indexOf(name);
  const prev =
    idx > -1 ? navList[(idx - 1 + navList.length) % navList.length] : undefined;
  const next =
    idx > -1 ? navList[(idx + 1) % navList.length] : undefined;

  if (!data) return <div className={styles.loading}>Loading…</div>;

  return (
    <main className={styles.container}>
      <nav className={styles.nav}>
        {prev && (
          <button
            onClick={() =>
              nav(`/pokemon/${prev}`, { state: { from, galleryList } })
            }
          >
            Previous
          </button>
        )}

        <Link to={from === "gallery" ? "/gallery" : "/list"}>
          Back to {from === "gallery" ? "gallery" : "list"}
        </Link>

        {next && (
          <button
            onClick={() =>
              nav(`/pokemon/${next}`, { state: { from, galleryList } })
            }
          >
            Next
          </button>
        )}
      </nav>

      <section className={styles.hero}>
        <img src={data.sprites.front_default ?? ""} alt={data.name} />
        <h1>{data.name}</h1>
      </section>

      <section className={styles.details}>
        <div><strong>ID:</strong> {data.id}</div>
        <div><strong>Base XP:</strong> {data.base_experience}</div>
        <div><strong>Types:</strong> {data.types.map((t) => t.type.name).join(", ")}</div>
        <div><strong>Abilities:</strong> {data.abilities.map((a) => a.ability.name).join(", ")}</div>
        <div>
          <strong>Stats:</strong>{" "}
          {data.stats.map((s) => `${s.stat.name}:${s.base_stat}`).join("  ")}
        </div>
      </section>
    </main>
  );
}
