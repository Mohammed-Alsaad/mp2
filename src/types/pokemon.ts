export interface PokemonListItem { name: string; url: string; }
export interface PokemonSpriteSet { front_default: string | null; other?: any; }
export interface PokemonStat { base_stat: number; stat: { name: string }; }
export interface PokemonType { slot: number; type: { name: string; url: string }; }
export interface PokemonAbility { is_hidden: boolean; ability: { name: string } }

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  sprites: PokemonSpriteSet;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
}

export interface PokemonTypeList { results: { name: string; url: string }[]; }
