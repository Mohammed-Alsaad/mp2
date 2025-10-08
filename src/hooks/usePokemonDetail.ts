import { useEffect, useState } from "react";
import { fetchPokemon } from "../api/pokeapi";
import type { Pokemon } from "../types/pokemon";

export function usePokemonDetail(name: string) {
  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPokemon(name).then((d) => { setData(d); setLoading(false); });
  }, [name]);

  return { data, loading };
}
