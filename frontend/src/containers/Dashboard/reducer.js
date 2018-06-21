import { setInitialState as getInitialState } from './initialState'

export const DASHBOARD_FETCH = 'DASHBOARD - fetch dashboard data'

export default (state = getInitialState(), action) => {
  if (!action.payload) {
    return state
  }
  // payload is consructed before being dispatched so there's no need for specific cases, just let them fall through
  switch (action.type) {
    case DASHBOARD_FETCH:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
