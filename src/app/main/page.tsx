'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPokemonListInfinite, getPokemonSearch } from '@/services/services';
import { useMemo, useRef } from 'react';
import { useObserver } from '@/hooks/useObserver';
import { useRecoilState } from 'recoil';
import { searchValueAtom } from '@/atoms';
import PokemonCardList from './components/PokemonCardList';

function Main() {
  const bottomRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useRecoilState(searchValueAtom);
  const deferredSearch = searchValue;

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
    queryKey: ['pokemonSearch', deferredSearch],
    queryFn: () => {
      if (!Number(deferredSearch) || Number(deferredSearch) > 1010) return null;
      return getPokemonSearch(Number(deferredSearch));
    },
    enabled: !!deferredSearch,
  });

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    if (deferredSearch) return null;
    return entry.isIntersecting && fetchNextPage();
  };

  useObserver({
    target: bottomRef,
    onIntersect,
  });

  const errorMessage = useMemo(() => {
    if (isNaN(Number(deferredSearch)) || deferredSearch === '0' || Number(deferredSearch) > 1010)
      return '1~1010 까지의 번호를 입력해주세요.';
    return '';
  }, [deferredSearch]);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <section className="pb-20">
        <h1 className="pb-8 text-center text-blue-500 font-bold">포켓몬 도감</h1>
        <input
          type="search"
          className="focus:outline-none w-80 border-b px-1 py-2 bg-white"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          placeholder="포켓몬의 번호를 입력해주세요.(1~1010)"
        />
        <p className="text-sm text-red-500 pt-2">{errorMessage}</p>
      </section>

      <section className="max-w-screen-lg">
        <PokemonCardList searchData={searchData} pokemonListPages={(!deferredSearch && pokemonPageData?.pages) || []} />
      </section>

      <div className="pb-10" ref={bottomRef} />

      {isFetchingNextPage && <div>불러오는 중..</div>}
    </main>
  );
}

export default Main;
