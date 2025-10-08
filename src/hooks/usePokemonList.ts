import { useEffect, useMemo, useState } from "react";
import { fetchPokemonPage, fetchPokemon } from "../api/pokeapi";
import { useSort } from "../context/SortContext";

export function usePokemonList() {
  const [raw, setRaw] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const { sortKey, sortDir } = useSort();

  useEffect(() => {
    (async () => {
      // Fetch first 151 Pokémon for quick loading
      const page = await fetchPokemonPage(151, 0);
      const detailed = await Promise.all(
        page.results.map((p) => fetchPokemon(p.name))
      );
      setRaw(detailed);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? raw.filter((p) => p.name.includes(q)) : raw;
  }, [raw, query]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    list.sort((a, b) => {
      const aVal = sortKey === "name" ? a.name : a.id;
      const bVal = sortKey === "name" ? b.name : b.id;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [filtered, sortKey, sortDir]);

  return { list: sorted, query, setQuery };
}
