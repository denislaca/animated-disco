import { setInitialState as getInitialState } from './initialState'

export const EDIT_PRISONER_FETCH = 'PrisonerEdit Component - EDIT_PRISONER_FETCH'
export const FETCH = 'fetch'

export default (state = getInitialState(), action) => {
  if (!action.payload) {
    return state
  }
  // payload is consructed before being dispatched so there's no need for specific cases, just let them fall through
  switch (action.type) {
    case EDIT_PRISONER_FETCH:
      state = {}
      return {
        // unwrap state and payload - it will map each other
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
