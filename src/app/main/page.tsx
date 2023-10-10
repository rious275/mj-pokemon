'use client';

import PokemonCardList from './components/PokemonCardList';

const Main = () => {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <section className="pb-20">
        <h1 className="pb-8 text-center text-blue-500 font-bold">포켓몬 도감</h1>
        <input type="search" className="focus:outline-none w-80 border-b px-1 py-2" placeholder="포켓몬의 번호를 입력해주세요." />
      </section>

      <section className="max-w-screen-lg">
        <PokemonCardList />
      </section>
    </main>
  );
};

export default Main;
