import { setInitialState as getInitialState } from './initialState'

export const JOB_FETCH = 'JobDetail Component - JOB_FETCH'
export const JOB_ATTENDANCES_FETCH = 'JobDetail Component - JOB_ATTENDANCES_FETCH'

export default (state = getInitialState(), action) => {
  if(!action.payload) {
    return state
  }
  // payload is consructed before being dispatched so there's no need for specific cases, just let them fall through
  switch(action.type) {
    case JOB_FETCH:
    case JOB_ATTENDANCES_FETCH:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
