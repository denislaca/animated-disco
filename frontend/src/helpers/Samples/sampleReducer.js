// Structure of a basic reducer
import { setInitialState as getInitialState } from './sampleInitialState'


export default (state = getInitialState(), action) => {
  // Action has to contain a payload
  if (!action.payload) {
    return state
  }
  // payload is consructed before being dispatched so there's no need for specific cases, just let them fall through
  switch (action.type) {
    case 'AND ANATHA ONE':
    case 'ANATHA ONE':
    case 'PLACEHOLDER IN CASE YOU DONT NEED ACTUAL REDUX STATE TO SET VALUES':
      return {
        // unwrap state and payload - it will map each other
        ...state,
        ...action.payload,
      }
    // I do not recommend using this method, it's better to change it directly in payload
    case 'PLACEHOLDER IN CASE YOU NEED TO CHANGE REDUX STATE DIRECTLY':
      return {
        ...state,
        // e.g. toggling boolean value
        placeholder: !state.placeholder,
        // in this case payload will contain dummy object - { dummy: undefined }
        // will rework the structure of this in future if needed
      }
    default:
      return state
  }
}
