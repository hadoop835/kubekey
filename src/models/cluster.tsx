export default {
  namespace: 'cluster',
  state: {
    hosts: [],
  },
  // effects: {
  //   *addHost({ payload }, { put }) {
  //     yield put({
  //       type: 'addHost',
  //       payload,
  //     });
  //   },
  // },
  reducers: {
    addHost(state: any, { payload: host }: { payload: any }) {
      console.log('addHost', host);
      console.log('state', state);
      return {
        ...state,
        hosts: [...state.hosts, host],
      };
    },
  },
};
