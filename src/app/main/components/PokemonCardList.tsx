'use client';

import React, { useMemo } from 'react';
import { PokemonCardProps, PokemonListPageTypes, PokemonListPagesProps } from '@/types/pokemonTypes';
import PokemonCard from './PokemonCard';

const PokemonCardList = ({ searchData, pokemonListPages }: { searchData?: any; pokemonListPages: PokemonListPagesProps }) => {
  const pokemonList = useMemo(
    () => pokemonListPages?.map((page: PokemonListPageTypes) => page.data).flat() || [],
    [pokemonListPages],
  );

  return (
    <ul className="flex items-center justify-center gap-4 flex-wrap">
      {searchData ? (
        <PokemonCard key={searchData.id} pokemon={searchData} />
      ) : (
        pokemonList.map((pokemon: PokemonCardProps) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
      )}
    </ul>
  );
};

export default PokemonCardList;
