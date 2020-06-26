import { fetchAllusers, add, fetchReports, editReports, updateReports, removeReoprts } from '../services/reports';


export default {
    namespace: 'reports',
    state: {
        list: [],
        userlist: [],
        total: 0,
        page: 1,
        pageSize: 5,
        info: {
        }
    },
    reducers: {
        setUsers(state, { payload }) {
            state.userlist = payload
            return { ...state }
        },
        setReports(state, { payload: { list, page, total } }) {
            return { ...state, list, total, page }
        },
        setInfo(state, { payload }) {
            return { ...state, info: payload }
        }
    },
    effects: {
        *getUsers({ payload }, { call, put }) {
            const res = yield call(fetchAllusers, {});
            if (res && res.state === 'success') {
                yield put({ type: 'setUsers', payload: res.data })
            }
        },
        *add({ payload }, { call }) {
            return yield call(add, payload)
        },
        *fetch({ payload: { page } }, { call, put, select }) {
            const pageSize = yield select(state => state.reports.pageSize);
            const res = yield call(fetchReports, { page, pageSize });
            if (res && res.state === 'success') {
                console.log(res.data)
                yield put({ type: 'setReports', payload: { ...res.data, page, pageSize } })
            } else {
                yield put({ type: 'setReports', payload: { data: { list: [], total: 0 } } })
            }
        },
        *fetchInfo({ payload }, { call, put }) {
            const res = yield call(editReports, payload);
            if (res && res.state === 'success') {
                yield put({ type: 'setInfo', payload: res.data })
                return res
            } else {
                yield put({ type: 'setInfo', payload: {} })
            }
        },
        *update({ payload }, { call }) {
            return yield call(updateReports, payload)
        },
        *remove({ payload }, { call }) {
            return yield call(removeReoprts, payload)
        }
    },
    subscriptions: {
        setUp({ history, dispatch }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/reports') {
                    dispatch({ type: 'fetch', payload: { page: 1, pageSize: 5 } })
                }
            })
        }
    }
}