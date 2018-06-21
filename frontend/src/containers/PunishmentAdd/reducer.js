import { setInitialState as getInitialState } from './initialState'

export const SET_COMPLETED = 'PunishmentAdd - Set Completed'

export default (state = getInitialState(), action) => {
  if (!action.payload) {
    return state
  }
  switch (action.type) {
    case SET_COMPLETED:
    case 'Basic prisoners reducer case':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
