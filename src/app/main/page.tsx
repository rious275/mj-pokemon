'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPokemonListInfinite, getPokemonSearch } from '@/services/services';
import { useRef, useState } from 'react';
import { useObserver } from '@/hooks/useObserver';
import PokemonCardList from './components/PokemonCardList';

function Main() {
  const bottomRef = useRef<HTMLDivElement>(null);

  const [searchText, setSearchText] = useState<string>('');

  const {
    data: pokemonPageData,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemonList'],
    queryFn: getPokemonListInfinite,
    getNextPageParam: lastPage => {
      const { next } = lastPage;
      if (!next) return false;
      return Number(new URL(next).searchParams.get('offset'));
    },
  });

  const { data: searchData } = useQuery({
    queryKey: ['pokemonSearch', searchText],
    queryFn: () => {
      if (!Number(searchText) || Number(searchText) > 1012) return null;
      return getPokemonSearch(Number(searchText));
    },
    enabled: !!searchText,
  });

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    if (searchText) return null;
    return entry.isIntersecting && fetchNextPage();
  };

  useObserver({
    target: bottomRef,
    onIntersect,
  });

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <section className="pb-20">
        <h1 className="pb-8 text-center text-blue-500 font-bold">포켓몬 도감</h1>
        <input
          type="search"
          className="focus:outline-none w-80 border-b px-1 py-2"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
          placeholder="포켓몬의 번호를 입력해주세요.(1~1000)"
        />
      </section>

      <section className="max-w-screen-lg">
        <PokemonCardList searchData={searchData} pokemonListPages={(!searchText && pokemonPageData?.pages) || []} />
      </section>

      <div className="pb-10" ref={bottomRef} />

      {isFetchingNextPage && <div>불러오는 중..</div>}
    </main>
  );
}

export default Main;
