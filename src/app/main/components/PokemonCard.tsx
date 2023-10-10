'use client';

import { PokemonCardProps } from '@/types/pokemonTypes';
import { zeroPadNumber } from '@/utils/filters';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const liStyle =
  'flex items-center gap-0.5 w-80 h-36 border rounded-2xl p-6 pl-10 hover:border-blue-300 hover:border-2 hover:cursor-pointer';

const PokemonCard = ({ pokemon }: { pokemon: PokemonCardProps }) => {
  const router = useRouter();

  const { id, image, name } = pokemon;

  return (
    <li key={id} className={liStyle} onClick={() => router.push(`/detail/${id}`)}>
      <Image src={image} alt="image" width={64} height={0} priority />

      <div className="pl-6">
        <span className="text-sm text-gray-400 pt-3">{zeroPadNumber(Number(id))}</span>
        <h2 className="text-l font-bold pb-2">{name}</h2>
      </div>
    </li>
  );
};

export default PokemonCard;
