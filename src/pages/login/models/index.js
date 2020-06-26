

import { login } from '../serivers'

export default {
    namespace: 'login',
    state: {
        info: {}
    },
    effects: {
        *loginIn({ payload }, { call }) {
            return yield call(login, payload);
        }
    }
}