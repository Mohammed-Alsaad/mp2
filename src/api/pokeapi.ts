import { http } from "./axiosClient";
import type { PokemonListItem, Pokemon, PokemonTypeList } from "../types/pokemon";

export async function fetchPokemonPage(limit: number, offset: number) {
  // Returns { results: [{ name, url }], count }
  const { data } = await http.get<{ results: PokemonListItem[]; count: number }>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  return data;
}

export async function fetchPokemon(name: string) {
  const { data } = await http.get<Pokemon>(`/pokemon/${name.toLowerCase()}`);
  return data;
}

export async function fetchTypes() {
  const { data } = await http.get<PokemonTypeList>("/type");
  return data;
}
