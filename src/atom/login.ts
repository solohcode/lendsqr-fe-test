import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export type UserData = {
  email?: string,
  password?: string,
}

type LoginData = {
  isLoggedIn: boolean,
  user: UserData,
}

const { persistAtom } = recoilPersist({
  key: "userData",
  storage: localStorage,
});

// authentication atom / state
export const authAtom = atom<LoginData>({
  key: "userAuthState",
  default: {
    isLoggedIn: false,
    user: {}
  },
  effects_UNSTABLE: [persistAtom],
});