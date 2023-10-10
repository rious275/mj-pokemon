import { BASE_URL } from '@/constants';
import { LanguageType, PokemonListInfiniteTypes } from '@/types/pokemonTypes';
import { IMAGE_BASE_URL } from '@/utils/filters';

export const getPokemonListInfinite = async ({ pageParam = 0 }) => {
  const res = await fetch(`${BASE_URL}/pokemon?limit=24&offset=${pageParam}`).then(response => response.json());

  const pokemonPageData = await Promise.all(
    res.results.map(async (pokemon: PokemonListInfiniteTypes) => {
      const pokemonId = pokemon.url.slice(34, -1);
      const speciesRes = await fetch(`${BASE_URL}/pokemon-species/${pokemonId}`).then(response => response.json());
      const koreanName = speciesRes.names.find(({ language }: LanguageType) => language.name === 'ko').name;

      return {
        id: pokemonId,
        name: koreanName,
        image: `${IMAGE_BASE_URL}/${pokemonId}.gif`,
      };
    }),
  );

  return { data: pokemonPageData, next: res.next };
};

export const getPokemonDetail = async (id: string) => {
  const speciesQueryKey = `${BASE_URL}/pokemon-species/${id}`;
  const speciesRes = await fetch(speciesQueryKey).then(res => res.json());
  const koreanDesc = speciesRes.flavor_text_entries.find(({ language }: LanguageType) => language.name === 'ko');
  const koreanName = speciesRes.names.find(({ language }: LanguageType) => language.name === 'ko').name;

  /** 진화트리 */
  const evolutionQueryKey = speciesRes.evolution_chain.url;
  const evolution = await fetch(evolutionQueryKey).then(res => res.json());

  const origin = evolution.chain;
  const evolvesTo = origin.evolves_to[0];

  const chainIds = [];

  if (evolvesTo) {
    chainIds.push(origin.species.url.slice(42, -1));

    if (origin.evolves_to.length) {
      chainIds.push(origin.evolves_to[0].species.url.slice(42, -1));
    }

    if (evolvesTo.evolves_to.length) {
      chainIds.push(evolvesTo.evolves_to[0].species.url.slice(42, -1));
    }
  }

  return {
    name: koreanName,
    description: koreanDesc.flavor_text,
    classification: speciesRes.genera[1].genus,
    chainIds,
  };
};

export const getPokemonSearch = async (id: number) => {
  const speciesRes = await fetch(`${BASE_URL}/pokemon-species/${id}`).then(res => res.json());
  const koreanName = speciesRes.names.find(({ language }: LanguageType) => language.name === 'ko').name;
  return {
    id,
    name: koreanName,
    image: `${IMAGE_BASE_URL}/${id}.gif`,
  };
};
