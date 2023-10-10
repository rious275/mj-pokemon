'use client';

import PokemonCard from '@/app/main/components/PokemonCard';
import Image from 'next/image';
import React from 'react';

const Detail = () => {
  return (
    <main className="flex flex-col items-center justify-between p-10 pt-24">
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
        alt="image"
        width={200}
        height={0}
        priority
      />

      <div className="flex flex-col items-center">
        <span className="text-xl text-gray-400 pt-3">001</span>
        <h2 className="text-2xl font-bold">이상해씨</h2>
        <h3 className="text-l text-gray-400 pb-2">씨앗포켓몬</h3>
        <ul className="flex gap-2 pb-8">
          <li className="text-s bg-black text-white p-0.5 px-2 rounded">풀</li>
          <li className="text-s bg-black text-white p-0.5 px-2 rounded">강화</li>
        </ul>

        <p className="text-xl">태어났을 때부터 등에\n이상한 씨앗이 심어져 있으며\n몸과 함께 자란다고 한다.</p>

        <div className="flex flex-col items-center">
          <h3 className="text-xl text-blue-500 pt-16 pb-6">진화트리</h3>
          <div className="flex items-center gap-10">
            <div>
              <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                alt="image"
                width={80}
                height={0}
                priority
              />
              <h4 className="text-center pt-2">이상해씨</h4>
            </div>
            <span>&#62;</span>
            <div>
              <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg"
                alt="image"
                width={80}
                height={0}
                priority
              />
              <h4 className="text-center pt-2">이상해풀</h4>
            </div>
            <span>&#62;</span>
            <div>
              <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg"
                alt="image"
                width={80}
                height={0}
                priority
              />
              <h4 className="text-center pt-2">이상해꽃</h4>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Detail;
