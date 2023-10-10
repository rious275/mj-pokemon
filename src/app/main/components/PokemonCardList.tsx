import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonCardList = () => {
  return (
    <ul className="flex items-center justify-center gap-4 flex-wrap">
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
    </ul>
  );
};

export default PokemonCardList;
