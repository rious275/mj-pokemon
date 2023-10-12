import { atom } from 'recoil';

export const searchValueAtom = atom<string>({
  key: 'searchValueAtom',
  default: '',
});
