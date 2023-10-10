'use client';

import { DETAIL_IMAGE_BASE_URL } from '@/constants';
import { getPokemonDetail } from '@/services/services';
import { zeroPadNumber } from '@/utils/filters';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

const Detail = () => {
  const { id: pokemonId }: { id: string } = useParams();

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
      {pokemonId && <Image src={`${DETAIL_IMAGE_BASE_URL}/${pokemonId}.svg`} alt="image" width={200} height={160} priority />}

      <div className="flex flex-col items-center pt-4">
        <span className="text-xl text-gray-400 pt-3">{zeroPadNumber(Number(pokemonId))}</span>
        <h2 className="text-2xl font-bold">{pokemonDetail?.name}</h2>
        <h3 className="text-l text-gray-400 pb-8">{pokemonDetail?.classification}</h3>

        <p className="text-xl">{pokemonDetail?.description}</p>

        <div className="flex flex-col items-center">
          {pokemonDetail?.chainIds.length && <h3 className="text-xl text-blue-500 pt-16 pb-6">진화트리</h3>}
          <div className="flex items-center gap-10">
            {pokemonDetail?.chainIds.map(chainId => (
              <React.Fragment key={chainId}>
                <div>
                  <Image src={`${DETAIL_IMAGE_BASE_URL}/${chainId}.svg`} alt="image" width={80} height={0} priority />
                  <h4 className="text-center pt-2">이상해씨</h4>
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
