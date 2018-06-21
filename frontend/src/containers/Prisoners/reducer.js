import { setInitialState as getInitialState } from './initialState'

export const PRISONERS_FETCH = 'PrisonersList Component - PRISONERS_FETCH'
export const REMOVE_ALL_PRISONERS = 'PrisonersList Component - REMOVE_ALL_PRISONERS'
export const FILTER_PRISONERS = 'PrisonersList Component - FILTER_PRISONERS'

export default (state = getInitialState(), action) => {
  if (!action.payload) {
    return state
  }
  // payload is consructed before being dispatched so there's no need for specific cases, just let them fall through
  switch (action.type) {
    case REMOVE_ALL_PRISONERS:
      return {}
    case FILTER_PRISONERS:
      return Object.values(state).filter(prisoner => (
        prisoner.first_name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1 ||
        prisoner.last_name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
      ))
    case PRISONERS_FETCH:
    // eslint-disable-next-line no-param-reassign
      state = {}
    // eslint-disable-next-line
    case 'Basic prisoners reducer case':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
