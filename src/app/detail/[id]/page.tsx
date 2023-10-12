'use client';

import { DETAIL_IMAGE_BASE_URL } from '@/constants';
import { getPokemonDetail } from '@/services/services';
import { zeroPadNumber } from '@/utils/filters';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

const Detail = () => {
  const { id: pokemonId }: { id: string } = useParams();

  const [error, setError] = useState(false);

  const { data: pokemonDetail, isLoading } = useQuery({
    queryKey: ['pokemonDetail', pokemonId],
    queryFn: () => getPokemonDetail(pokemonId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>불러오는중...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-between p-10 pt-16">
      {pokemonId && error ? (
        <div className="text-3xl">🤦‍♂️..</div>
      ) : (
        <Image
          src={`${DETAIL_IMAGE_BASE_URL}/${pokemonId}.svg`}
          alt="image"
          width={200}
          height={160}
          priority
          onError={() => setError(true)}
        />
      )}

      <div className="flex flex-col items-center pt-4">
        <span className="text-xl text-gray-400 pt-3">{zeroPadNumber(Number(pokemonId))}</span>
        <h2 className="text-2xl font-bold">{pokemonDetail?.name}</h2>
        <h3 className="text-l text-gray-400 pb-8">{pokemonDetail?.classification}</h3>

        <p className="text-xl">{pokemonDetail?.description}</p>

        <div className="flex flex-col items-center">
          {pokemonDetail?.chainPokemons.length ? <h3 className="text-xl text-blue-500 pt-16 pb-6">진화트리</h3> : null}
          <div className="flex items-center gap-10">
            {pokemonDetail?.chainPokemons.map(chainPokemon => (
              <React.Fragment key={chainPokemon.id}>
                <div>
                  {error ? (
                    <div className="text-3xl">🤦‍♂️..</div>
                  ) : (
                    <Image src={chainPokemon.image} alt="image" width={80} height={0} priority onError={() => setError(true)} />
                  )}
                  <h4 className="text-center pt-2">{chainPokemon.name}</h4>
                </div>
                <span className="last:hidden">&#62;</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Detail;
