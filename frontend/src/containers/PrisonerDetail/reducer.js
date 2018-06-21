import { setInitialState as getInitialState } from './initialState'

export const PRISONER_FETCH = 'PrisonersDetail Component - PRISONER_FETCH'
export const PRISONER_PUNISHMENTS_FETCH = 'PrisonersDetail Component - PRISONER_PUNISHMENTS_FETCH'

export default (state = getInitialState(), action) => {
  if (!action.payload) {
    return state
  }
  // payload is consructed before being dispatched so there's no need for specific cases, just let them fall through
  switch (action.type) {
    case PRISONER_FETCH:
    case PRISONER_PUNISHMENTS_FETCH:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
