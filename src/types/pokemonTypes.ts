import { RefObject } from 'react';

export type PokemonCardProps = {
  id: string;
  image: string;
  name: string;
};

export type PokemonListPageTypes = { data: PokemonCardProps[]; next: string };

export type PokemonListPagesProps = PokemonListPageTypes[];

export type UseOpserverProps = {
  target: RefObject<HTMLDivElement>;
  onIntersect: (entries: IntersectionObserverEntry[]) => void;
  root?: null;
  rootMargin?: string;
  threshold?: number;
};

export type PokemonListInfiniteTypes = {
  name: string;
  url: string;
};

export type LanguageType = { language: { name: string } };
