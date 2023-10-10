import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const liStyle =
  'flex items-center gap-0.5 w-80 h-36 border rounded-2xl p-6 pl-10 hover:border-blue-300 hover:border-2 hover:cursor-pointer';

const PokemonCard = () => {
  const router = useRouter();

  return (
    <li className={liStyle} onClick={() => router.push('/detail/1')}>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif"
        alt="image"
        width={64}
        height={0}
        priority
      />

      <div className="pl-6">
        <span className="text-sm text-gray-400 pt-3">001</span>
        <h2 className="text-l font-bold pb-2">이상해씨</h2>
        <div>
          <ul className="flex gap-2">
            <li className="text-xs bg-black text-white p-0.5 px-2 rounded">풀</li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default PokemonCard;
