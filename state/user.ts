import { atom } from 'recoil';
import { User } from '../src/models';

export const authenticatedUserAtom = atom<User | null>({
  key: 'authenticatedUserAtom',
  default: null,
});
