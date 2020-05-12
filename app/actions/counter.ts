import axios from 'axios';
import https from 'https';
import { GetState, Dispatch } from '../reducers/types';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const GETVDCLIST_COUNTER = 'GETVDCLIST_COUNTER';

export function getvdc(data) {
  return {
    type: GETVDCLIST_COUNTER,
    data
  };
}

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function getVdcList() {
  // return {
  //   type: INCREMENT_COUNTER
  // };
  return (dispatch: Dispatch) => {
    axios({
      method: 'post',
      baseURL: 'https://10.144.225.186',
      url: '/u/ers/api/v1/auth/token?action=withApikey',
      // params: { action: 'withApikey' },
      headers: {
        'Content-Type': 'application/json'
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      data: JSON.stringify({
        apikey:
          'dpjtBG2a+RizGuVPEgsWs/BLJInGQWfg+74O7ZXTRazJX2JF3yaWd759oKz3PnvyArbEZS/qhsJLHnXJboGb308u+3RsDl4GI4sYWoEvi/Dke/PAZZN5++7PLRbUqDrErZgpSQBaH7TqBOXqtfoNF+s4ro2x/SHP05IDmvXaMTFEONE90KHSC0pz8ZFabbYYwmFf4enjfIvzEUi4rm/jTjwwVWZj8F5SZrVEXwIBiv3yHEW1RlxvQUPk8e5sqQk3s/SjeHm1HENCiAuIh4zz9+5QDO3esliWpqMNDWpflZ2aQzhAHhpDNEpr7u87GLDXXG9NWZNOxpgrX7LMH+Ding=='
      })
    })
      .then(res => {
        console.log(res);
        console.log(res.data.result.token);
        return axios({
          method: 'post',
          baseURL: 'https://10.144.225.186',
          url: '/u/cql/stored/vdc/listVdc',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${res.data.result.token}`
          },
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          data: JSON.stringify({})
        });
      })
      .then(res2 => {
        console.log(res2);
        const vdcList = res2.data.result.map(vdc => {
          const { esin } = vdc.basic;
          return esin;
        });
        console.log(vdcList);
        dispatch(
          {
            type: GETVDCLIST_COUNTER,
            data: vdcList
          }
          // getvdc(vdcList)
        );
        return {
          type: GETVDCLIST_COUNTER,
          data: vdcList
        };
      })
      .catch(error => {
        console.log(error);
        return {
          type: GETVDCLIST_COUNTER,
          data: []
        };
      });
  };
}

export function incrementIfOdd() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
