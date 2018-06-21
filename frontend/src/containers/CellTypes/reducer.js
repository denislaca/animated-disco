import { setInitialState as getInitialState } from './initialState'

export const CELL_TYPES_FETCH = 'CellTypesList Component - CELL_TYPES_FETCH'

export default (state = getInitialState(), action) => {
  if (!action.payload) {
    return state
  }
  // payload is consructed before being dispatched so there's no need for specific cases, just let them fall through
  switch (action.type) {
    case CELL_TYPES_FETCH:
    // eslint-disable-next-line no-param-reassign
      state = {}
    // eslint-disable-next-line
    case 'Basic cell types reducer case':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
