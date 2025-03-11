import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const authState = atom({
    key: 'authState',
    default: {
        accessToken: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        id: '',
        permissions: {},
    },
    effects_UNSTABLE: [persistAtom],
});
