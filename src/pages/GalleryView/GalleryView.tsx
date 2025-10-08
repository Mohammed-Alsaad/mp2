import { usePokemonList } from "../../hooks/usePokemonList";
import { usePokemonTypes } from "../../hooks/usePokemonTypes";
import { Link } from "react-router-dom";
import styles from "./GalleryView.module.css";
import { useState } from "react";

export default function GalleryView() {
  const { list } = usePokemonList();
  const types = usePokemonTypes();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (t: string) =>
    setSelected((old) => (old.includes(t) ? old.filter((x) => x !== t) : [...old, t]));

  const filtered = selected.length
    ? list.filter((p) => selected.every((t) => p.types.some((pt: any) => pt.type.name === t)))
    : list;

  return (
    <main className={styles.container}>
      {/* Sidebar with filters */}
      <aside className={styles.sidebar}>
        <h3>Filter by type</h3>
        <div className={styles.typeList}>
          {types.map((t) => (
            <label key={t} className={styles.typeItem}>
              <input
                type="checkbox"
                checked={selected.includes(t)}
                onChange={() => toggle(t)}
              />
              {t}
            </label>
          ))}
        </div>
      </aside>

      {/* Pokémon grid */}
      <section className={styles.grid}>
        {filtered.map((p) => (
          <Link
            to={`/pokemon/${p.name}`}
            key={p.name}
            className={styles.card}
              state={{
                from: "gallery",
                galleryList: filtered.map((x) => x.name),
            }}
          >
            <img src={p.sprites?.front_default ?? ""} alt={p.name} />
            <div className={styles.caption}>{p.name}</div>
          </Link>
        ))}
      </section>
    </main>
  );
}
