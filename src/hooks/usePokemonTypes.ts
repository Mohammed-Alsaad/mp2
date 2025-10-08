import { useEffect, useState } from "react";
import { fetchTypes } from "../api/pokeapi";

export function usePokemonTypes() {
  const [types, setTypes] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const data = await fetchTypes();
      setTypes(data.results.map((t) => t.name).sort());
    })();
  }, []);
  return types;
}
