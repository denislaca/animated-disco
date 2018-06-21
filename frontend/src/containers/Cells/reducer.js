import { setInitialState as getInitialState } from './initialState'

export const CELLS_FETCH = 'CellList Component - CELLS_FETCH'

export default (state = getInitialState(), action) => {
  if (!action.payload) {
    return state
  }
  // payload is consructed before being dispatched so there's no need for specific cases, just let them fall through
  switch (action.type) {
    case CELLS_FETCH:
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
